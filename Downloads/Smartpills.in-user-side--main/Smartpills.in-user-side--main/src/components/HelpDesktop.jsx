import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HelpDesktop = () => {
  const [navButtonHelp, setNavButtonHelp] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const url = new URL(window.location.href);
    const path = url.pathname;

    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div
      className={`relative px-3 py-2 rounded-3xl  ${
        navButtonHelp ? "text-orange-500" : "border-transparent"
      }`}
      onMouseEnter={() => {
        setNavButtonHelp(true);
        setIsDropdownOpen(true);
      }}
      onMouseLeave={() => {
        setNavButtonHelp(false);
        setIsDropdownOpen(false);
      }}
    >
      Help
      {isDropdownOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <ul>
            <li className="px-3 py-1 hover:bg-gray-200">
              <Link to={loggedIn ? "/login-help" : "/help"}>Help</Link>
            </li>
            <li className="px-3 py-1 hover:bg-gray-200">
              <Link to="/query?label=Cancer">Cancer</Link>
            </li>
            <li className="px-3 py-1 hover:bg-gray-200">
              <Link to="/query?label=Chronic%20Care">Chronic Care</Link>
            </li>
            <li className="px-3 py-1 hover:bg-gray-200">
              <Link to="/query?label=Generics">Generics</Link>
            </li>
            <li className="px-3 py-1 hover:bg-gray-200">
              <Link to="/query?label=Special%20Needs">Special Needs</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HelpDesktop;
