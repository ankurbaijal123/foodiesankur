import Header from "../Header";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/Store/appStore";
import { BrowserRouter } from "react-router";
jest.mock("../../../logo.png", () => "mocked-logo.png");

import logo from "../../../logo.png";




describe("Header Test Cases", () => {
  it("Should load header component with Login button", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    // Verify login button exists
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  it("Should find cart" , () =>{
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );

    // Verify login button exists
    const cart = screen.getByText("Cart 🛒"); // /Cart/
    expect(cart).toBeInTheDocument();
  })

  it("Should change the Login button to Logout on click", () =>{
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );


    const loginbutton = screen.getByRole("button", {name: "Login"});
    fireEvent.click(loginbutton);
    const logoutbutton = screen.getByRole("button", {name: "Logout"});

    expect(logoutbutton).toBeInTheDocument();
  })
});
   