import logo from "../../logo.png";
import { useEffect, useState } from "react"; 
import {Link} from "react-router";
import "../../index.css"
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const[btnName, setLoginBtn] = useState("Login");
  const online = useOnlineStatus();
    return (
      <div className="Header">
        <div className="logo-container">
          <img className="app-logo" src={logo} alt="App Logo" />
        </div>
        <div className="nav-items">
          <ul>
          <li> Online Status: {online ? "🟢": "🔴" }</li>
            <li> <Link to= "/">Home</Link></li>
            <li> <Link to= "/about">About</Link></li>
            <li>Cart</li>
            <li><Link to="/grocery">Grocery Store</Link></li>
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