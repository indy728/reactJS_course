import React from 'react'
import classes from './NavigationItem.module.css'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
        <NavLink
            to={props.link}
            exact
            activeClassName={classes.active}
        >
            {props.children}
        </NavLink>
        {/* <a
            href={props.link}
            className={props.active ? classes.active: null}
        >
            {props.children}
        </a> */}
    </li>
)

navigationItem.propTypes = {
    link: PropTypes.string.isRequired,
    active: PropTypes.bool
}

export default navigationItem
