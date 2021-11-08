import React, { Component } from "react";
import axios from "axios";
import { Button , Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap';


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
            memeResponse : [],
            filter: [],
            source: [],
            modal: false,
            currImg: ""
        }
        this.handleChange = this.handleChange.bind(this);
        
        
    }

    

    handleChange(event){
        
        this.setState({ searchTerm: event.target.value})
        console.log("search:",this.state.searchTerm);
        var filteredres = []
        var source = []
        for(let i =0; i<100; i++){
            //console.log(String(this.state.memeResponse[i].name))
            let str = String(this.state.memeResponse[i].name)
            let res =str.match(this.state.searchTerm)
            //console.log(res);
            if (res){
                //console.log('present', res)
                filteredres.push(res["input"])
                source.push(this.state.memeResponse[i].url)
            }

        }

        this.setState({filter: filteredres, source: source})

        
    }


    render() {
        //console.log(this.state.filter)
        //console.log(this.state.source)
        if(this.state.searchTerm.length===0){
            return(
                <div>
                        <input onChange={(event)=>{
                            this.setState({searchTerm: event.target.value})
                        }}></input>
                </div>
                );
            

        }
        else{
            return (
                <div>
                    <input onChange={this.handleChange}></input>
                    
                    <table border = '5px'>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>source</td>
                            </tr>
                        </thead>
                        <tbody>
                           
                            {this.state.filter.map( (head,i) => <tr>
                                <td>{head}</td>
                                <td> <a onClick={()=>{this.setState({ modal: !this.state.modal, currImg: this.state.source[i]})}}>{this.state.source[i]}</a></td>
                                </tr>)}
                            
                           
                        </tbody>
                    </table>
                    <Modal isOpen={this.state.modal} toggle={()=>{this.setState({ modal: !this.state.modal})}}>
                        <ModalHeader>title</ModalHeader>
                        <ModalBody>
                            <img width={"500px"} height={"500px"} src={this.state.currImg}></img>
                        </ModalBody>
                        <ModalFooter>
                        <Button>OK</Button>
                        </ModalFooter>
                    </Modal>
                   
                </div>
            );
            
        }
        
        
        
    }

}

export default newSearchBar