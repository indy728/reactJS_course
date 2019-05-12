import React from 'react';

const userOutput = (props) => {
    return (
        <div className="UserOutput">
            <p>Hi, my name is {props.userName}.</p>
            <p>My favorite hobby is {props.hobby}.</p>
        </div>
    )
}

export default userOutput;