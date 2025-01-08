import React from "react";
import ReactDOM from "react-dom/client";
import "../style.css";
import Body from "./Components/Body"
import Header from "./Components/Header";
import About from "./Components/About";
import Footer from "./Components/Footer";
import {createBrowserRouter, RouterProvider } from "react-router";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/contact",
    element: <About />
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);


//React helps to write less code and do more in webpage
// we can make optimized webpages