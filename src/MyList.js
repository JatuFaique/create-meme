import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./MyList.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import GenMeme from "./GenMeme";

class MyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      currImg: null,
    };
    this.signOut = this.signOut.bind(this);
  }
  signOut() {
    this.setState({
      islogout: true,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.props.history.push("");
  }
  render() {
    return (
      <div class="dashboard grid-container col-3">
        <div class="grid-content">
          <ul class="list pos-sticky">
            <div className="list-heading">
              <span>Hello, {String(localStorage.getItem("username"))}</span>
              <i className="fa-solid fa-minus"></i>
            </div>
            <li>
              <div
                onClick={() => {
                  this.props.history.push("DashBoard");
                }}
                className="list-heading"
              >
                <span>Dashboard</span>
              </div>
            </li>
            <li>
              Click on the Checkbox to make a list of your favoirite memes
            </li>
            <li>
              <div
                onClick={() => {
                  this.props.history.push("MyList");
                }}
                className="list-heading"
              >
                <span>Show My List</span>
              </div>
            </li>
            <li>You can checkout your saved Items and Generate a meme Here,</li>

            <li>
              <button onClick={this.signOut} className="btn-secd">
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div class="grid-content">
          <h2>Your List</h2>
          <p>You can view your selected memes here</p>
          <div class="flex">
            {JSON.parse(
              localStorage.getItem(localStorage.getItem("username"))
            )?.map((item, i) => {
              return (
                <div
                  onClick={() => {
                    this.setState({
                      currImg: item.url,
                    });
                  }}
                  className="item card card-horizontal"
                >
                  <div className="content-horizontal">
                    <img className="card-img" src={item.url} alt="loading" />

                    <div className="card-text">
                      <p>{item.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div class="grid-content">
          <GenMeme image={this.state.currImg} />
        </div>
      </div>
    );
  }
}

export default withRouter(MyList);
