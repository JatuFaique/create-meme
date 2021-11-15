import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import NewSearchBar from "./NewSearchBar";
import MakeImage from "./MakeImage";
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "./Dashboard";
import Login from "./Login";

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
        {/* <NewSearchBar />
        <MakeImage /> */}
        {/* <Dashboard /> */}
        <Router>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/Dashboard" exact>
            <Dashboard />
          </Route>
        </Router>
        {/* <MakeImage /> */}
      </div>
    );
  }
}

export default App;
