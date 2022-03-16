import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> {" - "}  Profile
          </h3>
        </header>

        <table className = "profiletable">
                <tr>
                    <td><strong>Token:</strong></td>
                    <td>
                        {currentUser.accessToken.substring(0, 20)} ...{" "}
                        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                    </td>
                </tr>
                <tr>
                    <td><strong>Id:</strong></td>
                    <td>{currentUser.id}</td>
                </tr>
                <tr>
                    <td><strong>Username:</strong></td>
                    <td>{currentUser.username}</td>
                </tr>
                <tr>
                    <td><strong>Email:</strong></td>
                    <td>{currentUser.email}</td>
                </tr>
                <tr>
                    <td><strong>Authorities: </strong> {" "}</td>
                    <td> 
                      <ul>
                      {currentUser.roles &&
                      currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                    </ul>
                    </td>
                </tr>
        </table>  

      </div>: null}
      </div>
    );
  }
}
