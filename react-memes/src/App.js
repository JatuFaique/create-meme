import React from "react"
import { Component } from "react"
import axios from "axios";
import SearchBar from "./SearchBar";
class App extends Component {
    constructor(props){
        super(props)
        //axios = require('axios')
        axios.get('https://api.imgflip.com/get_memes').then((response) => {
            //console.log(response.data.data.memes);
        })
    }
    



    render(){
      return(
          <div>
                <h1>Meme Page</h1>
                <SearchBar />  
            </div>
      )
    }
  }

  export default App