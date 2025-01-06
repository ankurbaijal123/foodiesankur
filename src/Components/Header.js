import logo from "../../logo.png";


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

export default Header; 