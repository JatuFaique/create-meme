import React, { Component } from "react";
import { Redirect } from "react-router";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import "./Login.css";
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
  handleTestUser = (event) => {
    event.preventDefault();
    this.setState({
      loginParams: {
        user_id: "adminA",
        user_password: "123",
      },
    });
  };
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
      toast.success("Login Successfull");
    } else if (user_id === "adminB" && user_password === "123") {
      toast.success("Login Successfull");
      localStorage.setItem("token", "B");
      localStorage.setItem("username", user_id);
      this.setState({
        logged_in: true,
      });
    } else {
      toast.warn("Login Failed");
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
          <h1>Please sign in</h1>

          <input
            value={this.state.loginParams.user_id}
            type="text"
            name="user_id"
            onChange={this.handleFormChange}
            placeholder="Enter Username"
          />
          <input
            value={this.state.loginParams.user_password}
            type="password"
            name="user_password"
            onChange={this.handleFormChange}
            placeholder="Enter Password"
          />
          <button className="btn-prim" type="submit" value="Login">
            Login
          </button>

          {/* <p>user_id === "adminA or adminB" && user_password === "123"</p> */}
          <button onClick={this.handleTestUser} className="btn-secd">
            Test User
          </button>
        </form>
      </div>
    );
  }
}
