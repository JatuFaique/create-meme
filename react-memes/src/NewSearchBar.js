import React, { Component } from "react";
import axios from "axios";


class newSearchBar extends Component{
    constructor(props){
        super(props);
        //api call

        const url = "https://api.imgflip.com/get_memes"
        axios.get(url).then((response) => {
            //console.log('hi', response.data.data)
            this.setState({ memeResponse: response.data.data.memes})
        })


        //creating state variables
        this.state = { 
            searchTerm : "",
            memeResponse : []
        }
        this.handleChange = this.handleChange.bind(this);
        
        
    }

    handleChange(event){
        this.setState({ searchTerm: event.target.value})
        //console.log(typeof(this.state.memeResponse[0].name));
        var filteredres = []
        
        for(let i =0; i<100; i++){
            //console.log(String(this.state.memeResponse[i].name))
            let str = String(this.state.memeResponse[i].name)
            let res =str.match(this.state.searchTerm)
            //console.log(res);
            if (res){
                //console.log('present', res)
                filteredres.push(res["input"])
            }

        }

        console.log(filteredres)

        
    }


    render() {
        return (
        <div>
            <input onChange={this.handleChange}></input>
            {/* { this.state.memeResponse[0].map( ()=>{} )} */}
           
        </div>
        );
        
    }

}

export default newSearchBar