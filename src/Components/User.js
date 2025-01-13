import "../../style.css"
import me from "../utils/me.jpg"
import { useState, useEffect } from "react"
const User = (props) =>{

    const[count, setCount] = useState(0);

    useEffect(() =>{
        fetchdata()
    }, [])

    const fetchdata = async () =>{
        const data = await fetch("https://api.github.com/users/ankurbaijal123")
        const jsondata = await data.json();
        console.log(jsondata)
    }
    return(
        <>
        <div className="user-card">
        <img className="user-image" src={me} />
        <h2>Count: {count}</h2>
        <button onClick={() =>{
            
            setCount(count + 1)
        }}>Click Me</button>
        <h2>Name: {props.name}</h2>
        <h3>Location: Lucknow</h3>
        <h4>Conatct: ankur.baijal11@gmail.com</h4>
        <h4>I am currently learning React by exploring various hooks and integrating live APIs to build dynamic and Context Driven UI Applications.</h4>
        </div>
        


        </>
    )
    
}
export default User;