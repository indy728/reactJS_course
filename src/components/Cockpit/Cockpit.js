import React, {useEffect, useRef} from 'react';

import AuthContext from '../../context/auth-context';

const Cockpit = (props) => {
    
    const toggleBtnRef = useRef(null);

    // useEffect runs after the DOM has been rendered for the first time
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        toggleBtnRef.current.click();
        return () => {
            console.log('[Cockpit.js] end of useEffect')
        }
    }, [])

    const style = {
        backgroundColor: 'green',
        font: 'inherit',
        border: '1px solid blue',
        padding: '8px',
        cursor: 'pointer',
        color: 'white',
        // Radium is required for pseudo selectors on inline styling
        // ':hover': {
        //     backgroundColor: 'lightgreen',
        //     color: 'black'
        // }
        // style.backgroundColor = 'red';
        //   style[':hover'] = {
        //     backgroundColor: 'salmon',
        //     color: 'black'
        // }
    }

    // let classes = [];

    // if (props.persons.length <= 2) {
    //   classes.push('red')
    // }
    // if (props.persons.length <= 1) {
    //   classes.push('bold')
    // }

    console.log(props.title);

    return (
        <div>
            <h1>{props.title}</h1>
            <p >This is really working!</p>
            {/* notice that switchNameHandler is a function but is not called with parentheses */}
            <button ref={toggleBtnRef} style={style} onClick={props.clicked}>Switch Name</button>
            <AuthContext.Consumer>
                {(context) => <button onClick={context.login}>{context.authenticated ? "LOG OUT" : "LOG IN"}</button>}
            </AuthContext.Consumer>
        </div>
    )
};

export default Cockpit;