import React from "react";
import NewSearchBar from "./NewSearchBar";
import MakeImage from "./MakeImage";
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "./Dashboard";

// import axios from "axios";

// import SearchBar from "./SearchBar";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
  }

  render() {
    return (
      <div>
        {/* <Button color="danger" onClick={()=>{this.setState({ modal: !this.state.modal})}}>Danger!</Button>
                <table>
                  <tr>
                    <td>
                      <a onClick={()=>{this.setState({ modal: !this.state.modal})}}>Click me </a>
                    </td>
                  </tr>
                </table>
              <Modal isOpen={this.state.modal} toggle={()=>{this.setState({ modal: !this.state.modal})}}>
                <ModalHeader>title</ModalHeader>
                <ModalBody></ModalBody>
                <ModalFooter>
                  <Button>OK</Button>
                </ModalFooter>
              </Modal> */}

        {/* <NewSearchBar />
        <MakeImage /> */}
        <Dashboard />
      </div>
    );
  }
}

export default App;
