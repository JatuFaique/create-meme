import React, { Component } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter, Link, Redirect } from "react-router-dom";
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
    //Map over checked index and put that item information in local storage
    var userA_check = [];
    userA_check = this.state.checkedList.map((index, i) => {
      return this.props.memesList[index];
    });
    console.log(userA_check);

    localStorage.setItem(
      localStorage.getItem("username"),
      JSON.stringify(userA_check)
    );
    this.setState({
      checkedList: [],
    });
  }

  handleCheck(i, isChecked) {
    // index and checked status
    // append in checklist that index for re creation
    // Added if..else check for unchecking items

    if (isChecked) {
      console.log(i);
      //true append id to checklist
      if (this.state.checkedList.indexOf(this.props.memesList[i].id) == -1)
        this.setState({
          checkedList: [
            ...this.state.checkedList,
            i,
            // this.props.memesList[i].id,
            //   save with names
            //   {
            //     id: this.props.memesList[i].id,
            //     name: this.props.memesList[i].name,
            //   },
          ],
        });
    } else {
      if (this.state.checkedList.indexOf(i) != -1)
        this.state.checkedList.splice(this.state.checkedList.indexOf(i, 1));
    }
  }

  handleShowList(e) {
    // check for local storage empty or not
    if (!JSON.parse(localStorage.getItem(localStorage.getItem("username")))) {
      alert("No list to show");
    } else {
      console.log();
      this.setState({
        showMyList: !this.state.showMyList,
      });
    }
  }

  render() {
    if (this.state.showMyList) {
      return (
        <div>
          <Button
            onClick={() => {
              this.setState({
                showMyList: !this.state.showMyList,
              });
            }}
          >
            Dashboard
          </Button>
          <table border="5px">
            <thead>
              <tr>
                <td>Name</td>
                <td>source</td>
                <td>ID</td>
              </tr>
            </thead>
            <tbody>
              {JSON.parse(
                localStorage.getItem(localStorage.getItem("username"))
              ).map((showItem, i) => (
                <tr key={i}>
                  <td>{showItem.name}</td>
                  <td>{showItem.url}</td>
                  <td>{showItem.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <div>
        {/* Show my list for Showing Checked list instead of all meme table using if */}
        <p> Show your selected Meme List </p>
        <Button onClick={this.handleShowList}>Show My List</Button>
        <br></br>
        <form>
          {/* Make my list Pushhes the mapped items in local storage */}
          <p>
            Use Make My List as a Submit button after Selecting your choices
          </p>
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
              {/* mapping over the api response over index and show all,
              e.target.checked - True / False  
              i                - Index for which it is checked  */}
              {this.props.memesList.map((item, i) => (
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
