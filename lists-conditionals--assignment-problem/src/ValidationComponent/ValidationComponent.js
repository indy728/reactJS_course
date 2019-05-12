import React from 'react';

const ValidationComponent = (props) => {

    const minLength = 5;

    let longEnough = props.inputLength < minLength ? "Text Too Short" : "Text Long Enough";
    
    return (
        <p>{longEnough}</p>
    )
}

export default ValidationComponent;