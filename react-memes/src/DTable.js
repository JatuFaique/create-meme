import React, { Component } from 'react'


export default class DTable extends Component {
        
    
    constructor(props){
        super(props);
        console.log(this.props.memeRes)
        
    }

    render() { 
        //console.log("hi", this.state.allMeme.memes[0].name)
        return (
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
        )
    }
    
}
