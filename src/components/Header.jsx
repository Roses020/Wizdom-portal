import React from "react"
import { NavLink } from "react-router-dom"
import AuthContext from "../store/AuthContext"
import { useContext } from "react"
import "./Header.css";

const Header = () => {
    const authCtx = useContext(AuthContext);

    return (
        <header >
       <nav className="nav">
        <NavLink to="/"></NavLink>
        <NavLink to="/Auth"></NavLink>
        <NavLink to="/Home"><button className="homeBtn">Home</button></NavLink>
        <NavLink to="/Profile"><button className="profileBtn">Profile</button></NavLink>
        {authCtx.token ? 
                <button className="logout-btn" onClick={() => authCtx.logout()}>
                  Logout
                </button>
        : ''}
       </nav>
          <p className="Wizard_Quote">"Not all those who wander are lost"</p>
          <h2 className="wizdom_portal_welcome">Welcome To</h2>
            <h2 className="wizdom_portal_banner">Wizdom Portal</h2>
       </header>
    )
}

export default Header;