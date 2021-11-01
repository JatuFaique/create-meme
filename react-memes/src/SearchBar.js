
import React,{ Component } from 'react'
// import DTable from './DTable';


export default class SearchBar extends Component{
    // function onchange(event){
    //     console.log(event.target.value);
    
    // }
    constructor(props){
        super(props)
        this.state = { search : "" }

        this.addElements = this.addElements.bind(this);

    }
    
    addElements(event){
        
        this.setState({ search: event.target.value });
        if(this.state.search===""){
        console.log(this.props.memeRes.data.data.memes[this.state.search].name);}
        else{
            console.log("nothing")
        }
        console.log(this.state.search)
        //var ImageName = document.querySelector(".image-name");
        var dTable = document.querySelector(".dynamicTable")
        var nrow = dTable.insertRow();
        var oneCell = nrow.insertCell(0)
        var twoCell = nrow.insertCell(1)
        
        oneCell.innerHTML = "<tr>"+this.state.search+"</tr>"; 
        twoCell.innerHTML = "<p>This is me</p>";
        
        //ImageName.innerText = event.target.value;
    }
    render(){ 

        
    if(this.state.search.length===0) {
        return (
            
            <div>
            <input onInput={this.addElements}></input>
                <div style={{color:'red'}} >
                    {/* <DTable searchProp={this.state.search} memeRes = {this.props.memeRes} /> */}
                    <div>
                    <table className="dynamicTable" border="5px">
                        <tr>
                            <td>Name</td>
                            <td>Image</td>
                        </tr>
                        <tr className="item">
                            <td className="image-name"></td>
                            <td className="image-source"></td>
                        </tr>
                    </table>
                    </div>
                </div>
                <div>Not anything</div>
            </div>
        )
        
    }
    else {
        return(
            <div>
                <input onInput={this.addElements}></input>
                {/* <DTable searchProp={this.state.search} memeRes = {this.props.memeRes}/> */}
                <div>
                    <table className="dynamicTable" border="5px">
                        <tr>
                            <td>Name</td>
                            <td>Image</td>
                        </tr>
                        <tr className="item">
                            <td className="image-name"></td>
                            <td className="image-source"></td>
                        </tr>
                    </table>
                    </div>
            </div>
            
        )
    
    }
}
}