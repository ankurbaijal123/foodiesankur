import React from "react";
import ReactDOM from "react-dom/client";
import "../style.css";
import Body from "./Components/Body"
import Header from "./Components/Header";
import About from "./Components/About";
import Footer from "./Components/Footer";
import Contact from "./Components/ContactUs";
import Error from "./Components/Error";
import RestuarentMenu from "./Components/RestuarentMenu";
import {createBrowserRouter, RouterProvider, Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet /> {/* for children components */}
      {/* if path = /   then body*/}
      {/* if path = /about   then about*/}
      {/* if path = /contact   then contact*/}
      {/* resId is dynamic */}
      <Footer />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/",
        element: <Body />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/restuarents/:resId", 
        element: <RestuarentMenu />
      }
    ],
    errorElement:<Error / >
  }
])  

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);


//React helps to write less code and do more in webpage
// we can make optimized webpages