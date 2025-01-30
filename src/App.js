import React, { lazy, Suspense, suspense, useContext, useEffect } from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import Body from "./Components/Body";
import Header from "./Components/Header";
//import Yo from "./Components/Yo";
import Shimmer from "./Components/Shimmer";
import Footer from "./Components/Footer";
import Contact from "./Components/ContactUs";
import Cart from "./Components/Cart";
import Error from "./Components/Error";
import RestuarentMenu from "./Components/RestuarentMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/Store/appStore";
import Checkout from "./Components/Check";

//Chunking
//Code Splitting
//Dynamic Bundling
//On demand Loading
//Lazy Loading ---> when our app loads then it wll not load
//the data for grocery , willbe loaded when i go to that page

//Logical seperation

const Grocery = lazy(() => import("./Components/Grocery"));

const About = lazy(() => import("./Components/About"));

const AppLayout = () => {
  const { loggedInUser } = useContext(UserContext);
  const [userName, setUserName] = useState(loggedInUser);

  useEffect(() => {
    const data = {
      name: "Ankur Baijal",
    };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
          <Header />
          <Outlet /> {/* for children components */}
          {/* if path = /   then body*/}
          {/* if path = /about   then about*/}
          {/* if path = /contact   then contact*/}
          {/* resId is dynamic */}
          <Footer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback={<Shimmer />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restuarents/:resId",
        element: <RestuarentMenu />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        
        path: "/checkout",
        element: <Checkout />,
      },
      
    ],
    errorElement: <Error />,
  },
  {/* {
    path: "/yo",
    element: <Yo />,
  }, */}
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);

//React helps to write less code and do more in webpage
// we can make optimized webpages
