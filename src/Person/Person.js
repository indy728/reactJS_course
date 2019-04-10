import React from 'react';

const person = (props) => {
    return (
        <div>
            <p>I'm {props.name} and I am {props.age} years old!</p>
            {/* props.children gives access to content inside of a component */}
            <p>{props.children}</p>
        </div>
    )
}

export default person;