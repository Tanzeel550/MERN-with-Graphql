import React from 'react'
import { NavLink } from 'react-router-dom'

import './MainNavigation.css'
import { connect } from 'react-redux'
import { startLogout } from '../actions/authActions'

const MainNavigation = props => {
    return (
        <header className="main-navigation">
            <div className="main-navigation__logo">
                <h1>Easy Event</h1>
            </div>
            <nav className="main-navigation__list">
                <ul>
                    {!props.isAuthenticated && (
                        <li className="main-navigation__list--item">
                            <NavLink to="/auth">Authenticate</NavLink>
                        </li>
                    )}
                    {props.isAuthenticated && (
                        <React.Fragment>
                            <li className="main-navigation__list--item">
                                <NavLink to="/bookings">Bookings</NavLink>
                            </li>
                            <li className="main-navigation__list--item">
                                <NavLink to="#" onClick={props.startLogout}>
                                    Logout
                                </NavLink>
                            </li>
                        </React.Fragment>
                    )}
                    <li className="main-navigation__list--item">
                        <NavLink to="/events">Events</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => ({ isAuthenticated })

export default connect(mapStateToProps, { startLogout })(MainNavigation)
