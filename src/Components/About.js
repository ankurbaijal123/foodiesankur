import User from "./User";
import React from "react"
import UserClass from "./UserClass";
class About extends React.Component{
    constructor(props){
        super(props)
        console.log("Parent Constructor")
    }

    componentDidMount(){
        console.log("Parent Mount")
    }

    render(){
        console.log("Parent Render")
        return(
            <>
            <center>
            <UserClass name={"First"}/>
            {/*<UserClass name={"Second"}/>
            <UserClass name={"Third"}/> */}
            </center>
            
            </>
            )
    }
}


export default About;