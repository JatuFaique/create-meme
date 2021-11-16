import React, { Component } from "react";
import "./NewSearchBar.css";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class NewSearchBar extends Component {
  constructor(props) {
    super(props);
    //api call

    const url = "https://api.imgflip.com/get_memes";
    axios.get(url).then((response) => {
      //console.log('hi', response.data.data)
      this.setState({ memeResponse: response.data.data.memes });
    });

    //creating state variables
    this.state = {
      searchTerm: "",
      memeResponse: [],
      filter: [],
      source: [],
      modal: false,
      currImg: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value }, () => {
      console.log("search:", this.state.searchTerm);
      var filteredres = [];
      var source = [];
      for (let i = 0; i < 100; i++) {
        //console.log(String(this.state.memeResponse[i].name))
        let str = String(this.state.memeResponse[i].name).toLowerCase();
        let res = str.match(this.state.searchTerm.toLowerCase());
        //console.log(res);
        if (res) {
          //console.log('present', res)
          filteredres.push(this.state.memeResponse[i].name);
          source.push(this.state.memeResponse[i].url);
        }
      }
      this.setState({ filter: filteredres, source: source });
    });
  }

  render() {
    //console.log(this.state.filter)
    //console.log(this.state.source)
    if (this.state.searchTerm.length === 0) {
      return (
        <div className="page-box">
          <div>
            <h1>Hey, Search Your Fav meme Here</h1>
            <p>Type anything here, (Ex. Drake, Cheem)</p>
          </div>
          <input onChange={this.handleChange}></input>
          <table className="response-table">
            <thead>
              <tr>
                <td>Sr. No</td>
                <td>Name</td>
                <td>Image</td>
              </tr>
            </thead>
            <tbody>
              {/* mapping over the api response over index and show all,
              e.target.checked - True / False  
              i                - Index for which it is checked  */}
              {this.state.memeResponse.map((item, i) => (
                <tr key={i}>
                  <td>{i}</td>
                  <td>{this.state.memeResponse[i].name}</td>
                  <td>
                    <img
                      style={{ width: "100px", height: "100px" }}
                      src={this.state.memeResponse[i].url}
                      onClick={() => {
                        this.setState({
                          modal: !this.state.modal,
                          currImg: this.state.memeResponse[i].url,
                        });
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div className="page-box">
          <div>
            <h1>Hey, Search Your Fav meme Here</h1>
          </div>
          <input onChange={this.handleChange}></input>
          <div>
            <table className="response-table">
              <thead>
                <tr>
                  <td>Sr. No</td>
                  <td>Name</td>
                  <td>Image</td>
                </tr>
              </thead>
              <tbody>
                {this.state.filter.map((name, i) => (
                  <tr>
                    <td>{i}</td>
                    <td>{name}</td>
                    <td>
                      <img
                        style={{ width: "100px", height: "100px" }}
                        src={this.state.source[i]}
                        onClick={() => {
                          this.setState({
                            modal: !this.state.modal,
                            currImg: this.state.source[i],
                          });
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            isOpen={this.state.modal}
            toggle={() => {
              this.setState({ modal: !this.state.modal });
            }}
          >
            <ModalHeader>title</ModalHeader>
            <ModalBody>
              <img
                width={"500px"}
                height={"500px"}
                src={this.state.currImg}
              ></img>
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
}

export default NewSearchBar;
