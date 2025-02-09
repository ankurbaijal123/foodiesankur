// Integration Testing.....
import {render, screen, fireEvent} from "@testing-library/react";
import Body from "../Body";
import { act } from "react"
import "@testing-library/jest-dom" 
import Mock_Data from "../__mocks__/resListMock.json"
import { BrowserRouter } from "react-router";

global.fetch = jest.fn(() =>{
    return Promise.resolve({
        json : () =>{
            return Promise.resolve(Mock_Data)
        }
    })
})

  describe("Search Test", () => {
    it("Should render the Body component with Search", async ()=>{
        
        await act (async () =>render(
            <BrowserRouter>
            <Body />
            </BrowserRouter>
        
        ))

        const searchBtn = screen.getByRole("button", {name: "Search 🔎"})
        const searchInput = screen.getByTestId("searchInput")
        fireEvent.change(searchInput, {target: {value: "Burger"}})
        fireEvent.click(searchBtn)

        //screen should have 2 cards

        const cards = screen.getAllByTestId("resCard");

        expect(cards.length).toBe(1); 
        expect(searchBtn).toBeInTheDocument();
    })

    it("Should filter top rated restuarent",async ()=>{
        await act (async () =>render(
            <BrowserRouter>
            <Body />
            </BrowserRouter>
        ))
        const filterBtn = screen.getByRole("button", {name: "Top Rated Restuarant"})
        
        fireEvent.click(filterBtn)

        //screen should have 2 cards

        const cards = screen.getAllByTestId("resCard");

        expect(cards.length).toBe(1); 
        expect(filterBtn).toBeInTheDocument();
        
        
    })
  })
