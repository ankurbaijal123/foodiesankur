import logo from "../../logo.png";
import { useEffect, useState, useContext } from "react"; 
import {Link} from "react-router";
import "../../index.css"
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const[btnName, setLoginBtn] = useState("Login");
  const online = useOnlineStatus();

  // console.log(loggedInUser)

  //Subscribing to the store using Selector
  // and gaining access to store.cart.items
  const cartItems = useSelector((store) =>(
    store.cart.items
  )) 

  console.log(cartItems)

  const {loggedInUser, setUserName} = useContext(UserContext);
  
  const handleLogin = () =>{
    setLoginBtn("Login")
    setUserName("Default User")
  }

  const handleLogout = () =>{
    setLoginBtn("Logout")
    setUserName(loggedInUser)
  }

 
    return(
      
  <div className="flex justify-between bg-gray-50 shadow-lg sg:bg-gray-70 lg:bg-gray-200">
  <div className="logo-container">
  <Link to="/"><img className="w-20 m-4" src={logo} alt="App Logo" /></Link>
  </div>
  <div className="nav-items items-center">
    <ul className="flex p-4 m-4">
      <li className="px-4 transition-all duration-300 ease-in-out">
        Online Status: {online ? "🟢" : "🔴"}
      </li>
      <li className="px-4 hover:text-blue-500 hover:scale-105 transition-all duration-300 ease-in-out">
        <Link to="/">Home</Link>
      </li>
      <li className="px-4 hover:text-blue-500 hover:scale-105 transition-all duration-300 ease-in-out">
        <Link to="/about">About</Link>
      </li>
      <li className="px-4 hover:text-blue-500 hover:scale-105 transition-all duration-300 ease-in-out">
      <Link to="/cart">{cartItems.length > 0 ? `Cart 🛒 - ${cartItems.length} Items` : `Cart 🛒`}</Link>
      </li>
      <li className="px-4 hover:text-blue-500 hover:scale-105 transition-all duration-300 ease-in-out">
        <Link to="/contact">Contact Us</Link>
      </li>
      {/* <li className="px-4 hover:text-blue-500 hover:scale-105 transition-all duration-300 ease-in-out">
        <Link to="/grocery">Grocery Store</Link>
      </li> */}
      <button
        className="login-button px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition-all"
        onClick={() => {
          btnName === "Logout" ? setLoginBtn("Login") : setLoginBtn("Logout");
          
          
        }}
      >
        {btnName}
      </button>
      <li className="px-4 hover:text-blue-500 hover:scale-105 transition-all duration-200 ease-in-out font-bold">
  {btnName === "Logout" ? `Hi! ${loggedInUser}` : `Hi! Default User`}
</li>

      
    </ul>
  </div>
</div>

    );
  };

export default Header; 