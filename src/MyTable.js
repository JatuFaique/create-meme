import React, { Component } from "react";
import axios from "axios";
import { Route, Routes } from "react-router";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { BrowserRouter, Link, Redirect, withRouter } from "react-router-dom";

import "./MyTable.css";
import GenMeme from "./GenMeme";

class MyTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: [],
      modal: false,
      searchTerm: "",
      currImg: "",
      memeResponse: [],
      showList: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    // this.handleShowList = this.handleShowList.bind(this);
  }

  componentDidMount() {
    const url = "https://api.imgflip.com/get_memes";
    axios.get(url).then((response) => {
      //console.log('hi', response.data.data)
      this.setState(
        {
          memeResponse: response.data.data.memes.map((a) => {
            return {
              ...a,
              isChecked: false,
            };
          }),
        },
        () => {
          this.setState({
            showList: this.state.memeResponse,
          });
        }
      );
    });

    console.log("heheheh");
  }

  handleSubmit(e) {
    e.preventDefault();
    // localstorage
    console.log("submitted finally", this.state.checkedList);
    //Map over checked index and put that item information in local storage
    var user_check = this.state.checkedList;

    localStorage.setItem(
      localStorage.getItem("username"),
      JSON.stringify(user_check)
    );
    this.setState({
      checkedList: [],
    });
  }

  handleCheck(item, e) {
    // index and checked status
    // append in checklist that index for re creation
    // Added if..else check for unchecking items
    console.log(item);
    let currid = this.state.memeResponse.findIndex(
      (element) => element.id === item.id
    );

    let newArray = [...this.state.memeResponse];
    newArray[currid] = {
      ...newArray[currid],
      isChecked: !newArray[currid].isChecked,
    };
    this.setState({
      showList: newArray,
      memeResponse: newArray,
    });

    this.setState({
      checkedList: [...this.state.checkedList, item],
    });
    if (e.target.checked) {
      //true append id to checklist

      if (this.state.checkedList.indexOf(this.state.checkedList[item]) === -1) {
        this.setState({
          checkedList: [...this.state.checkedList, item],
        });
      }
    } else {
      this.setState({
        checkedList: this.state.checkedList.filter((c_item) => {
          return c_item !== item;
        }),
      });
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
  handleSearch(e) {
    console.log(e.target.value);
    this.setState({
      searchTerm: e.target.value,
    });
    if (this.state.searchTerm.length !== 0) {
      let convertToLc = e.target.value.toLowerCase();
      let filterData = this.state.memeResponse.filter((e) => {
        let nameToLc = e.name.toLowerCase();
        return nameToLc.indexOf(convertToLc) !== -1;
      });

      this.setState({
        showList: filterData,
      });
    } else {
      this.setState({
        showList: this.state.memeResponse,
      });
    }
  }

  render() {
    return (
      <div className="table-box">
        {/* Show my list for Showing Checked list instead of all meme table using if */}
        <div> Show your selected Meme List </div>
        <div className="table-btn">
          <button
            onClick={() => {
              this.props.history.push("MyList");
            }}
          >
            Show My List
          </button>
        </div>
        <br></br>
        <form>
          {/* Make my list Pushhes the mapped items in local storage */}
          <p>
            Use Make My List as a Submit button after Selecting your choices
          </p>
          <div className="table-btn">
            <button type="submit" onClick={this.handleSubmit}>
              Make My List
            </button>
          </div>
          <div>
            <input type="text" onChange={this.handleSearch} />
          </div>
          <table className="response-table">
            <thead>
              <tr>
                <td>Checkbox</td>
                <td>Name</td>
                <td>Image</td>
                <td>ID</td>
              </tr>
            </thead>
            <tbody>
              {/* mapping over the api response over index and show all,
              e.target.checked - True / False  
              i                - Index for which it is checked  */}
              {this.state.showList.map((item, i) => (
                <tr key={i}>
                  <td>
                    <input
                      key={i}
                      type="checkbox"
                      checked={item.isChecked}
                      onChange={(e) => {
                        this.handleCheck(item, e);
                      }}
                    ></input>
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <img
                      style={{ width: "100px", height: "100px" }}
                      src={item.url}
                      onClick={() => {
                        this.setState({
                          modal: !this.state.modal,
                          currImg: item.url,
                        });
                      }}
                    />
                  </td>
                  <td>{item.id}</td>
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
              <button
                onClick={() => {
                  this.setState({ modal: !this.state.modal });
                }}
              >
                OK
              </button>
            </ModalFooter>
          </Modal>
        </form>
      </div>
    );
  }
}

export default withRouter(MyTable);
