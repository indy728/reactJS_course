import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Bacon', type: 'bacon'},
]

const BuildControls = ( props ) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => {
                return (
                    <BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        more={() => props.more(ctrl.type)}    
                        less={() => props.less(ctrl.type)}
                        disabled={props.disabled[ctrl.type]}    
                    />
                )
            })}
            <button
                className={classes.OrderButton}
                disabled={!props.purchaseable}
                // not the below version so that you can still save your burger and then authenticate
                // disabled={!props.purchaseable || !props.isAuth}
                onClick={props.ordered}
                type="button">
                    {props.isAuth ? "ORDER NOW" : "SIGN IN TO ORDER"}
            </button>
        </div>
    )
}

export default BuildControls
