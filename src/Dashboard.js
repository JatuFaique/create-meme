import React, { Component } from "react";
import axios from "axios";
import "./Dashboard.css";
import MyTable from "./MyTable";

import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    // if (localStorage.setItem("token", this.state.loginParams.user_id)) {
    // }
    super(props);
    this.state = {
      memeResponse: [],
      islogout: false,
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
    this.handleChange = this.handleChange.bind(this);
    this.signOut = this.signOut.bind(this);
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
    if (this.state.checkedList.length === 0) {
      alert("No items in list");
    } else alert("List Created Successfully");
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
    this.setState(
      {
        showList: newArray,
        // memeResponse: newArray,
      },
      () => {
        this.setState({
          memeResponse: newArray,
        });
      }
    );

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
    //Checklist there, on
    if (!localStorage.getItem("token")) {
      return <Redirect to="/" />;
    } else if (this.state.islogout) {
      return <Redirect to="/" />;
    }
    return (
      <div className="dashboard grid-container col-3" id="grid-container-a">
        <div className="grid-content">
          <ul className="list">
            <div className="list-heading">
              <span>Hello User</span>
              <i className="fa-solid fa-minus"></i>
            </div>
            <li>Create a List</li>
            <li
              onClick={() => {
                this.props.history.push("MyList");
              }}
            >
              SHow My List
            </li>
            <li>
              <button onClick={this.signOut} className="btn-secd">
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="grid-content">
          <div className="input-field">
            <input
              id="email-field"
              onChange={this.handleSearch}
              type="text"
              pattern=".*\S.*"
              required
            />
          </div>
          <div id="flex">
            {this.state.showList.map((item, i) => {
              return (
                <div className="card card-horizontal">
                  <div className="content-horizontal">
                    <img className="card-img" src={item.url} alt="loading" />

                    <div className="card-text">
                      <p>{item.name}</p>
                    </div>
                  </div>
                  <input
                    key={i}
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={(e) => {
                      this.handleCheck(item, e);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="grid-content">
          <button className="btn-prim" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
