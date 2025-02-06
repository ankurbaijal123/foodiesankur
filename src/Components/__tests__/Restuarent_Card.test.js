import {render, screen} from"@testing-library/react"
import RestuarentCard from "../RestuarentCard"
import Mock_Data from "../__mocks__/resCardMock.json"
import "@testing-library/jest-dom"

describe("Restuarent Card Tests", () =>{
    it ("Should render Restuarent component with props Data", () => {
        render(<RestuarentCard resData={Mock_Data}/>)
        const name = screen.getByText("McDonald's")
        expect(name).toBeInTheDocument();
    })

    it ("Should render Restuarent component with minutes", () => {
        render(<RestuarentCard resData={Mock_Data}/>)
        const min = screen.getByText("26 minutes 🚚")
        expect(min).toBeInTheDocument();
    })
})  