import React, { Component } from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

import './Person.css';
import Aux from '../../../hoc/Aux';
import AuthContext from '../../../context/auth-context';

class Person extends Component {

    constructor(props) {
        super(props)
        this.inputElementRef = React.createRef();
    }

    // this method of extracting context is only for classes but is
    // much more convenient. must be declared exactly as below
    static contextType = AuthContext;

    componentDidMount() {
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
        console.log(this.context.authenticated);
    }
    
    componentDidUpdate() {
        console.log(this.context.authenticated);

    }

    render () {

        const style = {
            '@media (min-width: 500px)': {
                width: '450px'
            }
        }
    
        console.log('[Person.js] rendering...');
    
        return (
            // <div className="Person" style={style}>
            <Aux>
                {/* <AuthContext.Consumer>
                    {(context) => 
                    <p>{context.authenticated ? "Authenticated" : "Please Log In"}</p>
                }
            </AuthContext.Consumer> */}
                {<p>{this.context.authenticated ? "Authenticated" : "Please Log In"}</p>}
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                {/* this.props.children gives access to content inside of a component */}
                <p>{this.props.children}</p>
                <input 
                    // ref={(inputElement) => {this.inputElement = inputElement}}
                    ref={this.inputElementRef}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name} />
            </Aux>
            // </div>
        )

    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default Radium(Person);