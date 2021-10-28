import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Component } from 'react';

export default class App extends Component {
  render(){
    return(
      <di>Hello</di>
    )
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


