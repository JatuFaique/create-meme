import React from "react"
import { Component } from "react"
import axios from "axios";

import SearchBar from "./SearchBar";
class App extends Component {

    async componentDidMount(){
        const resp = await axios.get('https://api.imgflip.com/get_memes')
        // .then((response)=>{
        //     this.setState({allMeme: response.data.data})
        // })
        this.setState({allMeme: resp})
        
    }

    constructor(props){
        super(props);
        this.state = { allMeme : null }
        
    }

    render(){
      return(
          <div>
                <h1>Meme Page</h1>
                <SearchBar memeRes = {this.state.allMeme}/>  
            </div>
      )
    }
  }

  export default App