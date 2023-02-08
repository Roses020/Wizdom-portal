import React from "react"
import { NavLink } from "react-router-dom"
import AuthContext from "../store/AuthContext"
import { useContext } from "react"
import "./Header.css";

const Header = () => {
    const authCtx = useContext(AuthContext);
    const username = localStorage.getItem('username');
    return (
        <header >
          <div className="Wizard_Quote_div">
            <p className="Wizard_Quote">"Not all those who wander are lost"</p>
          </div>
       <nav className="nav">
        <NavLink to="/"></NavLink>
        <NavLink to="/Auth"></NavLink>
        <NavLink to="/Home"><button className="homeBtn">Home</button></NavLink>
        <NavLink to="/Profile"><button className="profileBtn">Profile</button></NavLink>
        <NavLink to="Articles"><button className="Articles">Articles</button></NavLink>
        {authCtx.token ? 
                <button className="logout-btn" onClick={() => authCtx.logout()}>
                  Logout
                </button>
        : ''}
       </nav>
       <div>
          <div className='welcomeAndLogin'>
            <h2 className="wizdom_portal_welcome">Welcome To</h2>
            {authCtx.token ? <span className="username">Hi, {username}!</span> : ''}
          </div>
            <h2 className="wizdom_portal_banner">Wizdom Portal</h2>
        </div>
       </header>
    )
}

export default Header;