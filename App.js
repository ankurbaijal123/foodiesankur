import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import logo from "./logo.png";
/**
 * Header  
 * - LOGOooo
 * -Nav Items
 *
 * Body
 * - Search
 * - RestuarentContainer
 * - Restuarent Card
 *  ---- Name of Res, Star Rating, cuisine, delivery time
 *
 * Footer
 * - CopyRight
 * -Links
 * -Address
 * -Contact
 */

const Header = () => {
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
        </ul>
      </div>
    </div>
  );
};


const Footer = () => {
  return (
    <div className="Footer">
      {/* <div className="logo-container">
        <img className="app-logo" src={logo} alt="App Logo" />
      </div> */}
      <div className="nav-itemss">
        <ul>
          <li>Flavor at Your Fingertips – Savor, Share, Repeat!</li>
          </ul>
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>Carrier</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </div>
  );
};

const RestuarentCard = ({resName, cusine, star, delivery}) =>{
    return(
        <div className="res-card">
        <img className="res-logo" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/FOOD_CATALOG/IMAGES/CMS/2024/5/28/1c8674aa-3a16-4c31-b725-d69d812f5bb8_83446d5f-5b7d-4126-a129-4f5ee5a42f67.jpg" alt="logo-res" />
            <h3>{resName}</h3>
            <h4>{cusine}</h4>
            <h4>{star} stars</h4>
            <h4>{delivery}</h4>
        </div>
    )
}
const Body = () => {
  return (
    <div className="body">
      <div className="search-bar">Search</div>
      <div className="res-container">
      <RestuarentCard resName="Harshit Foods" 
      cusine="Biryani, North Indian, Asian"
      star="4.6" delivery="20 min"
      /> {/*passing props to function */}
      <RestuarentCard resName="KFC" 
      cusine="Biryani, Chicken, Burger"
      star="4.6" delivery="10 min"
      />
      
      </div> 
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
