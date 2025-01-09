import logo from "../../logo.png";
import { useEffect, useState } from "react"; 
import {Link} from "react-router";

const Header = () => {
  const[btnName, setLoginBtn] = useState("Login");
    return (
      <div className="Header">
        <div className="logo-container">
          <img className="app-logo" src={logo} alt="App Logo" />
        </div>
        <div className="nav-items">
          <ul>
            <li> <Link to= "/">Home</Link></li>
            <li> <Link to= "/about">About</Link></li>
            <li>Cart</li>
            <li> <Link to= "/contact">Contact Us</Link></li>
            <button className="login-button"
            onClick={() =>{
              btnName === "Login"?setLoginBtn("Logout") : setLoginBtn("Login")
            }}>{btnName}</button>
          </ul>
        </div>
      </div>
    );
  };

export default Header; 