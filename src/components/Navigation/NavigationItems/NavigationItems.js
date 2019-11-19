import React from 'react'
import NavItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.module.css'

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavItem link="/" >Burger Builder</NavItem>
            {props.isAuthenticated
                ? <NavItem link="/orders" >Orders</NavItem>
                : null }
            {props.isAuthenticated
                ? <NavItem link="/logout">Log Out</NavItem>
                : <NavItem link="/auth">Authenticate</NavItem>} 
        </ul>
    )
}

export default navigationItems
