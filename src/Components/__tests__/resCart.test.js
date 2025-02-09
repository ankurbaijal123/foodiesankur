import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react";
import RestuarentMenu from "../RestuarentMenu";
import Header from "../Header";
import Cart from "../Cart";
import Mock_Data_Name from "../__mocks__/Items.json";
import { Provider } from "react-redux";
import appStore from "../../utils/Store/appStore";
import { BrowserRouter } from "react-router";
import "@testing-library/jest-dom"

jest.mock("../../../logo.png", () => "mocked-logo.png");

// Mock API response
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(Mock_Data_Name),
  })
);

global.alert = jest.fn();

  it("Should Load Restaurant Menu Component", async () => {
    await act(async () =>
      render(
        <BrowserRouter>
          <Provider store={appStore}>
            <Header />
            <RestuarentMenu category={Mock_Data_Name}/>
            <Cart />
          </Provider>
        </BrowserRouter>
      )
    );

    // **Fix 1: Ensure Rs 59 Deal of the Day is in the DOM**
    const accordionHeader = await waitFor(() =>
      screen.getByText("Recommended (13)")
    );

    fireEvent.click(accordionHeader);
    expect(
        screen.getByText("Your Cart is Empty. Please grab some items 🛒🍜")
      ).toBeInTheDocument();

    // **Fix 2: Ensure food items load before interacting**
    await waitFor(() => {
      expect(screen.getAllByTestId("fooditems").length).toBe(13);
    });

    expect(screen.getByText("Cart 🛒")).toBeInTheDocument();

    // **Fix 3: Ensure Add buttons exist before clicking**
    const addBtns = await waitFor(() =>
      screen.getAllByRole("button", { name: "Add ➕" })
    );

    fireEvent.click(addBtns[0]);

    expect(screen.getByText("Cart 🛒 - 1 Items")).toBeInTheDocument();
    expect(screen.getAllByTestId("carts").length).toBe(1);

    fireEvent.click(addBtns[1]);
    expect(screen.getByText("Cart 🛒 - 2 Items")).toBeInTheDocument();
    expect(screen.getAllByTestId("carts").length).toBe(2);


    expect(
      screen.getByText("Total: ₹1713.00")
    ).toBeInTheDocument();

    const clear = screen.getByRole("button", { name: "Clear Cart" })
    expect(clear).toBeInTheDocument()

    fireEvent.click(clear)
    expect(
        screen.getByText("Your Cart is Empty. Please grab some items 🛒🍜")
      ).toBeInTheDocument();

  });

