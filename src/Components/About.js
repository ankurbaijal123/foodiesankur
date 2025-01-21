import User from "./User";
import React from "react";
import "../../index.css";
import UserClass from "./UserClass";
import UserContext from "../utils/UserContext";
class About extends React.Component {
  constructor(props) {
    super(props);
    console.log("Parent Constructor");
  }

  componentDidMount() {
    console.log("Parent Mount");
  }

  render() {
    console.log("Parent Render");
    return (
      <>
        <center>
          <div>
            <UserContext.Consumer>
              {({loggedInUser}) => <h2>{loggedInUser} is Viewing About Page</h2>}
            </UserContext.Consumer>
          </div>
          <UserClass name={"First"} />
          {/*<UserClass name={"Second"}/>
            <UserClass name={"Third"}/> */}
        </center>
      </>
    );
  }
}

export default About;
