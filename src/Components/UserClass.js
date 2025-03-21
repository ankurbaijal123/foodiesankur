import "../../index.css"
import me from "../utils/me.jpg"
import React from "react"
class UserClass extends React.Component {
    constructor(props){
        super(props)

        this.state={
            userInfo:{
                name: "Yo",
                location: "lets see"
            }
        }

        //console.log(this.props.name + "Constructor")
    }

    async componentDidMount(){
        const data = await fetch("https://api.github.com/users/ankurbaijal123")
        const jsondata = await data.json();
        console.log(jsondata)

        this.setState({
            userInfo: jsondata
        })
        //console.log(this.props.name +  "Mount")
    }
    
    render(){
        const {name, location, html_url, avatar_url} = this.state.userInfo;
         
        //console.log(this.props.name + "Render")
        return (
            <div className="user-card">
                    <center>
                    <img className="user-image" src={me} />
                    </center>
    
                    <h2>Name: {name}</h2>
                    <h3>Location: {location} 🙏</h3>
                    <h4>Conatct: {html_url} 😎</h4>
                    <br />
                    <h5 className="font-semibold">The Foodies App is designed to connect food enthusiasts with restaurants, cafes, and food delivery services. It provides a platform to explore diverse cuisines, order food seamlessly.</h5>
                    <br />
                    <h4 className="font-bold">About the Developer: I am currently learning React by exploring various hooks and integrating live APIs to build dynamic and interactive applications.</h4>
                    <h5>Made using React Class Based Components</h5>
                    </div>
        )
    }
}
export default UserClass

//Class Based Components