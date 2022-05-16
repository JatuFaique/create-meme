import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./MyTable.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import GenMeme from "./GenMeme";

class MyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  render() {
    return (
      <div className="table-box">
        <Button
          onClick={() => {
            this.props.history.push("/Dashboard");
          }}
        >
          Dashboard
        </Button>
        <table className="response-table">
          <thead>
            <tr>
              <td>Name</td>
              <td>Image</td>
              <td>ID</td>
            </tr>
          </thead>
          <tbody>
            {JSON.parse(
              localStorage.getItem(localStorage.getItem("username"))
            ).map((showItem, i) => (
              <tr key={i}>
                <td>{showItem.name}</td>
                <td>
                  <img
                    style={{ width: "100px", height: "100px" }}
                    src={showItem.url}
                    onClick={() => {
                      this.setState({
                        modal: !this.state.modal,
                        currImg: showItem.url,
                      });
                    }}
                  />
                </td>
                <td>{showItem.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={this.state.modal}
          toggle={() => {
            this.setState({ modal: !this.state.modal });
          }}
        >
          <ModalHeader>title</ModalHeader>
          <ModalBody>
            <GenMeme image={this.state.currImg} />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                this.setState({ modal: !this.state.modal });
              }}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default withRouter(MyList);
