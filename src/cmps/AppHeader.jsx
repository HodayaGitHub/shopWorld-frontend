
import React from 'react'
import { NavLink } from 'react-router-dom'
import { LoginSignUp } from './LoginSignUp.jsx'
import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../store/actions/user.actions.js'

export function AppHeader() {

    const loggedinUser = useSelector((storeState) => storeState.userModule.loggedinUser)

    async function onLogout() {
        try {
            await logout()
            console.log('bye')
        } catch (err) {
            console.error('Logout failed', err)
        }
    }


    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>TOYS ARE TOYS</h1>
                <nav className="app-nav">

                    <NavLink className="header-link" to="/">Home</NavLink>
                    <NavLink className="header-link" to="/toy">Toys</NavLink>
                    <NavLink className="header-link" to="/dashboard">Dashboard</NavLink>
                    <NavLink className="header-link" to="/visitus">Our Stores</NavLink>
                </nav>
            </section>

            <div>

                {loggedinUser ? (
                    < section >
                        <span>Hello {loggedinUser.fullname}</span>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignUp />
                    </section>
                )}
            </div>

        </header >
    )
}
