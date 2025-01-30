import Contact from "../ContactUs"
import {render, screen} from "@testing-library/react"
import "@testing-library/jest-dom"

describe("Contact Us Page test case", () => {
    test("Should load contact us page", () =>{
        render(<Contact />);
    
        const heading = screen.getByRole("heading")
        expect(heading).toBeInTheDocument();
    
        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument();
    })
    
    test("Should load contact us page and find button", () =>{
        render(<Contact />);
        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument();
    
    })
    
    test("Should load contact us page and find message", () =>{
        render(<Contact />)
        const mssg = screen.getByText("Send Message")
        expect(mssg).toBeInTheDocument();
    
    
    })
    
    it("Should load 3 input field", () =>{
        render(<Contact />);
        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument();
    
        const mssg = screen.getAllByRole("textbox")
        console.log(mssg)
    
    
    })
})

