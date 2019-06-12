import React, { Component } from 'react';
import Radium from 'radium';

import './Person.css';
import Aux from '../../../hoc/Aux';

class Person extends Component {

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
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old!</p>
                {/* this.props.children gives access to content inside of a component */}
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name} />
            </Aux>
            // </div>
        )

    }
}

export default Radium(Person);