import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "./Dashboard";
import Login from "./Login";
import MyList from "./MyList";

// import axios from "axios";

// import SearchBar from "./SearchBar";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { islogged: false };
  }

  render() {
    return (
      <div>
        {/* <NewSearchBar /> */}
        {/* <Dashboard /> */}
        <Router>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/Dashboard" exact>
            <Dashboard />
          </Route>
          <Route path="/MyList" exact>
            <MyList />
          </Route>
        </Router>
        {/* <MakeImage /> */}
      </div>
    );
  }
}

export default App;
