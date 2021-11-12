import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import MyTable from "./MyTable";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    const url = "https://api.imgflip.com/get_memes";
    axios.get(url).then((response) => {
      //console.log('hi', response.data.data)
      this.setState({ memeResponse: response.data.data.memes }, () => {});
    });

    this.state = {
      memeResponse: [],
    };
  }

  handleChange(event) {
    console.log(event.target.value);
  }

  render() {
    //Checklist there, on
    return (
      <div>
        <h1>Dashboard</h1>
        <MyTable memesList={this.state.memeResponse}></MyTable>
      </div>
    );
  }
}
