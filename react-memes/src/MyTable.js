import React, { Component } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import { Button } from "reactstrap";
import ShowList from "./ShowList";

export default class MyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: [],
      checkMark: true,
      showMyList: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleShowList = this.handleShowList.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    // localstorage
    console.log("submitted finally", this.state.checkedList);
  }

  handleCheck(i, isChecked) {
    if (isChecked) {
      console.log(i);
      //true append id to checklist
      if (this.state.checkedList.indexOf(this.props.memesList[i].id) == -1)
        this.setState({
          checkedList: [
            ...this.state.checkedList,
            this.props.memesList[i].id,
            //   save with names
            //   {
            //     id: this.props.memesList[i].id,
            //     name: this.props.memesList[i].name,
            //   },
          ],
        });
    } else {
      if (this.state.checkedList.indexOf(this.props.memesList[i].id) != -1)
        this.state.checkedList.splice(
          this.state.checkedList.indexOf(this.props.memesList[i].id, 1)
        );
    }
  }

  handleShowList(e) {
    // local me h?
    if (this.state.checkedList.length === 0) {
      alert("No list to show");
    } else {
      this.setState({
        showMyList: !this.state.showMyList,
      });
    }
  }

  render() {
    if (this.state.showMyList) {
      return <p>your list here</p>;
    }
    return (
      <div>
        <Button onClick={this.handleShowList}>SHow My List</Button>
        <br></br>
        <form>
          <Button type="submit" onClick={this.handleSubmit}>
            Make My List
          </Button>
          <table border="5px">
            <thead>
              <tr>
                <td>Checkbox</td>
                <td>Name</td>
                <td>source</td>
                <td>ID</td>
              </tr>
            </thead>
            <tbody>
              {this.props.memesList.map((name, i) => (
                <tr key={i}>
                  <td>
                    <input
                      key={i}
                      type="checkbox"
                      onChange={(e) => {
                        this.handleCheck(i, e.target.checked);
                      }}
                    ></input>
                  </td>
                  <td>{this.props.memesList[i].name}</td>
                  <td>{this.props.memesList[i].url}</td>
                  <td>{this.props.memesList[i].id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}
