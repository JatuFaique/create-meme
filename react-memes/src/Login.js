import React, { Component } from "react";
import { Redirect } from "react-router";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginParams: {
        user_id: "",
        user_password: "",
      },
    };
  }
  handleFormChange = (event) => {
    event.preventDefault();
    let loginParamsNew = { ...this.state.loginParams };
    let val = event.target.value;
    loginParamsNew[event.target.name] = val;
    this.setState({
      loginParams: loginParamsNew,
      logged_in: false,
    });
  };

  login = (event) => {
    let user_id = this.state.loginParams.user_id;
    let user_password = this.state.loginParams.user_password;
    if (user_id === "adminA" && user_password === "123") {
      localStorage.setItem("token", "A");
      localStorage.setItem("username", user_id);
      this.setState({
        logged_in: true,
      });
    } else if (user_id === "adminB" && user_password === "123") {
      localStorage.setItem("token", "B");
      localStorage.setItem("username", user_id);
      this.setState({
        logged_in: true,
      });
    }
    event.preventDefault();
  };
  render() {
    return (
      <div className="container">
        {this.state.logged_in ? (
          <>
            <Redirect to="/Dashboard" />
          </>
        ) : (
          <></>
        )}
        <form onSubmit={this.login} className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <div className="row">
            <div className="col">
              <input
                type="text"
                name="user_id"
                onChange={this.handleFormChange}
                placeholder="Enter Username"
              />
              <input
                type="password"
                name="user_password"
                onChange={this.handleFormChange}
                placeholder="Enter Password"
              />
              <input type="submit" value="Login" />
            </div>
          </div>
          <p>user_id === "adminA or adminB" && user_password === "123"</p>
        </form>
      </div>
    );
  }
}
