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
  }
  render() {
    return (
      <div class="dashboard grid-container col-3">
        <div class="grid-content">
          <ul class="list pos-sticky">
            <div class="list-heading">
              <span>Hello User</span>
              <i class="fa-solid fa-minus"></i>
            </div>
            <li
              onClick={() => {
                this.props.history.push("/Dashboard");
              }}
            >
              Create a List
            </li>
            <li>SHow My List</li>
            <li>
              <button class="btn-secd">Logout</button>
            </li>
          </ul>
        </div>
        <div class="grid-content">
          <h2>Your List</h2>
          <p>You can view your selected memes here</p>
          <div class="flex">
            {JSON.parse(
              localStorage.getItem(localStorage.getItem("username"))
            ).map((item, i) => {
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
