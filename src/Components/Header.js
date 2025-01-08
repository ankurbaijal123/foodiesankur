import logo from "../../logo.png";
import { useEffect, useState } from "react"; 

const Header = () => {
  const[btnName, setLoginBtn] = useState("Login");
    return (
      <div className="Header">
        <div className="logo-container">
          <img className="app-logo" src={logo} alt="App Logo" />
        </div>
        <div className="nav-items">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Cart</li>
            <li>Contact Us</li>
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