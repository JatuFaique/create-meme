import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import MyTable from "./MyTable";
import { Link, Redirect } from "react-router-dom";

export default class Dashboard extends Component {
  constructor(props) {
    // if (localStorage.setItem("token", this.state.loginParams.user_id)) {
    // }
    super(props);
    const url = "https://api.imgflip.com/get_memes";
    axios.get(url).then((response) => {
      //console.log('hi', response.data.data)
      this.setState({ memeResponse: response.data.data.memes }, () => {});
    });

    this.state = {
      memeResponse: [],
      islogout: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
  }

  signOut() {
    this.setState({
      islogout: true,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  render() {
    //Checklist there, on
    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    } else if (this.state.islogout) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h1>Dashboard</h1>
        {/* Only check implemented for One User [ Only One State Variable ]
            Passing Meme Response as Props to table component */}
        <Button onClick={this.signOut}>SignOut</Button>
        <MyTable memesList={this.state.memeResponse}></MyTable>
      </div>
    );
  }
}