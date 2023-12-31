
import React from 'react'
import { NavLink } from 'react-router-dom'
import { LoginSignUp } from './LoginSignUp.jsx'
import { useSelector } from 'react-redux'


export function AppHeader() {

    const user = useSelector((storeState) => storeState.user)


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
                {user &&
                    <h2>{user.fullname}</h2>
                }
                {!user && <LoginSignUp />}
                {user && <button onClick={onLogout}>log out </button>}
            </div>

        </header >
    )
}
