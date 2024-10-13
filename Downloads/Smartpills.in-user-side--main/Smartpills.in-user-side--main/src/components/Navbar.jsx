import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { BsPerson } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { IoReorderThreeOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import { HiMiniXMark } from "react-icons/hi2";
import "react-toastify/dist/ReactToastify.css";
import SearchNavbar from "./SearchNavbar";
import HelpDesktop from "./HelpDesktop";
import Cart from "./Cart"; // Import the Cart component

const Navbar = () => {
  const [currentPath, setCurrentPath] = useState("");
  const [navButtonform, setNavButtonform] = useState(false);
  const [navButtonwork, setNavButtonwork] = useState(false);
  const [navButtonhelp, setNavButtonhelp] = useState(false);
  const [account, setAccount] = useState(false);
  const [cart, setCart] = useState(false); // State to manage cart visibility
  const [loggedIn, setLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const path = url.pathname;
    setCurrentPath(path === "/" ? null : path.substring(1));

    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");
    // Clear user data from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("mobile")
    // Update logged in status
    setLoggedIn(false);
    // Redirect to homepage or any other desired page
    toast.success("Successfully logged out");
    console.log("logout done");
    navigate("/")
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div
      className={`sticky top-0 z-50 ${
        currentPath != null
          ? "bg-gradient-to-r from-orange-400 to-yellow-400"
          : ""
      }`}
    >
      <div className="flex py-2 justify-between ">
        <div className="w-10 lg:hidden">
          <IoReorderThreeOutline
            fontSize="2.5rem"
            className="bg-white  my-auto ml-4 rounded-3xl"
            onClick={() => setOpen(!open)}
          />
        </div>
        <Link to="/" className="lg:w-1/2 w-full ">
          <img
            src={logo}
            className={
              currentPath == null
                ? "lg:w-1/3 ml-10 lg:mt-3 mt-0 w-36"
                : "lg:w-3/5 ml-5 w-36"
            }
            alt="Logo"
          />
        </Link>
        {currentPath != null ? (
          // seach option
          <SearchNavbar />
        ) : (
          <div></div>
        )}
        {currentPath != null && (
          <div className="flex">
            <IoSearch
              className="lg:hidden my-auto mr-4"
              fontSize="2rem"
              onClick={() => setSearch(!search)}
            />
            <BsCartPlus
              className="lg:hidden my-auto mr-4"
              fontSize="2rem"
              onClick={() => setCart(true)}
              
            />
          </div>
        )}
        {open && (
          <HiMiniXMark
            fontSize="3rem"
            className="mr-4 my-auto lg:hidden"
            onClick={() => setOpen(false)}
          />
        )}
        <div
          className={
            currentPath != null
              ? "lg:flex w-full justify-between my-auto font-semibold text-black mr-8 hidden"
              : "lg:flex hidden w-1/2 justify-between my-auto font-semibold text-white mr-8"
          }
        >
          <div
            className={`ml-10 px-3 py-2 rounded-3xl border ${
              currentPath == null
                ? navButtonform
                  ? "text-white border-white bg-white bg-opacity-20"
                  : "border-transparent"
                : navButtonform
                ? "text-orange-500 bg-white border-orange-500"
                : "border-transparent"
            }`}
            onMouseEnter={() => setNavButtonform(true)}
            onMouseLeave={() => setNavButtonform(false)}
          >
            <Link to="/onboarding">Partner Form</Link>
          </div>
          <div
            className={` px-3 py-2 rounded-3xl border ${
              currentPath == null
                ? navButtonwork
                  ? "text-white border-white bg-white bg-opacity-20"
                  : "border-transparent"
                : navButtonwork
                ? "text-orange-500 bg-white border-orange-500"
                : "border-transparent"
            }`}
            onMouseEnter={() => setNavButtonwork(true)}
            onMouseLeave={() => setNavButtonwork(false)}
          >
            <Link to="/working">How SmartPills Work</Link>
          </div>

          {/* help in laptop screen */}
          {/* <div
            className={` px-3 py-2 rounded-3xl border ${
              currentPath == null
                ? navButtonhelp
                  ? "text-white border-white bg-white bg-opacity-20"
                  : "border-transparent"
                : navButtonhelp
                ? "text-orange-500 bg-white border-orange-500"
                : "border-transparent"
            }`}
            onMouseEnter={() => setNavButtonhelp(true)}
            onMouseLeave={() => setNavButtonhelp(false)}
          >
            <Link to={`${loggedIn ? "/login-help" : "/help"}`}>Helpp</Link>
          </div> */}
          <HelpDesktop />

          {/* account */}
          <div
            className="relative my-auto"
            onMouseEnter={() => setAccount(true)}
            onMouseLeave={() => setAccount(false)}
          >
            {loggedIn ? (
              <div
                className={`underline ${
                  currentPath == null ? "text-white" : "text-black"
                }`}
              >
                Hi, {user}
              </div>
            ) : (
              <BsPerson
                fontSize="1.6rem"
                className="my-auto"
                color={currentPath == null ? "white" : "black"}
              />
            )}
            {account && (
              <div
                className="absolute bg-white px-4 py-3 rounded-lg top-full transform -translate-x text-orange-400 whitespace-nowrap text-sm "
                style={{ right: "0", marginTop: "2px" }}
              >
                <div>
                  {loggedIn && (
                    <div>
                      <Link to="/profile">
                        <div className="hover:text-black my-1">My Profile</div>
                      </Link>
                      <Link to="/smartbuy">
                        <div className="hover:text-black my-1">Smart Buy</div>
                      </Link>
                    </div>
                  )}
                  <Link to="/bookmarks">
                    <div className="hover:text-black my-1">My Bookmarks</div>
                  </Link>
                  <Link to="/coupons">
                    <div className="hover:text-black my-1">My Coupons</div>
                  </Link>
                  <Link to="/subscriptions">
                    <div className="hover:text-black my-1">Subscription Plan</div>
                  </Link>

                  {loggedIn ? (
                    <div>
                      <div
                        className="hover:text-black my-1 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </div>
                    </div>
                  ) : (
                    <Link to="/signin">
                      <div className="hover:text-black my-1">Sign In</div>
                    </Link>
                  )}
                </div>
              </div>
            )}
            <ToastContainer />
          </div>
          {currentPath != null ? (
            <BsCartPlus
              fontSize="1.5rem"
              className="my-auto"
              onClick={() => {
                setCart(true);
                document.body.classList.add("no-scroll");
              }}
            />
          ) : null}
        </div>
      </div>
      {/* Cart section */}
      {cart && <Cart setCart={setCart} /> }
      {open && (
        <div className="absolute z-50 pl-10 font-semibold pb-5 bg-gradient-to-r w-full from-orange-400 to-yellow-400">
          <Link to="/onboarding">
            <div className="my-2">Partner Form</div>
          </Link>
          <Link to={{ pathname: '/working', state: { show: true } }}>
            <div className="my-2">How SmartPills Work</div>
          </Link>
          <Link to={`${loggedIn ? "/login-help" : "/help"}`}>
            <div className="my-2">Help</div>
          </Link>
          <Link to="/query?label=Cancer">
            <div className="my-2">Cancer Query</div>
          </Link>
          <Link to="/query?label=Chronic%20Care">
            <div className="my-2">Chronic Care Query</div>
          </Link>
          <Link to="/query?label=Generics">
            <div className="my-2">Generics Query</div>
          </Link>
          <Link to="/query?label=Special%20Needs">
            <div className="my-2">Special Needs Query</div>
          </Link>

          {loggedIn && (
            <div>
              <Link to="/profile">
                <div className="my-2">My Profile</div>
              </Link>
              <Link to="/smartbuy">
                <div className="my-2">Smart Buy</div>
              </Link>
            </div>
          )}
          <Link to="/coupons">
            <div className="my-2">My Coupons</div>
          </Link>
          <Link to="/bookmarks">
            <div className="my-2">My Bookmarks</div>
          </Link>

          {loggedIn ? (
            <div className="my-2 cursor-pointer" onClick={handleLogout}>
              Logout
            </div>
          ) : (
            <Link to="/signin">
              <div className="my-2">Sign In</div>
            </Link>
          )}
        </div>
      )}
      {search && (
        <div className="w-full pb-5 absolute bg-gradient-to-r from-orange-400 to-yellow-400">
          <div className=" bg-white w-11/12 mt-2 flex mx-auto h-10 ">
            <IoSearch fontSize="1.4rem" className="my-auto ml-5"></IoSearch>
            <input
              placeholder="Type your medicine name"
              className=" ml-4 focus:outline-none w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
