import React from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = ( props ) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
            if (props.ingredients[igKey] <= 0) return null
            return (
                <li key={igKey}>
                    Topping: <span style={{textTransform: 'capitalize'}}>{igKey}</span> Quantity: {props.ingredients[igKey]}
                </li>
            )
        })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue with Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled} >CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued} >CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary