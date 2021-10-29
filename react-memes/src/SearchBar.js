import React,{ useState } from 'react'
import DTable from './DTable';


export default function SearchBar() {
    // function onchange(event){
    //     console.log(event.target.value);
    
    // }
    
    const [search, setSearch] = useState(' ')
    function addElements(event){
        
        setSearch(event.target.value);
        //console.log(search)
        //var ImageName = document.querySelector(".image-name");
        var dTable = document.querySelector(".dynamicTable")
        var nrow = dTable.insertRow();
        var oneCell = nrow.insertCell(0)
        var twoCell = nrow.insertCell(1)

        oneCell.innerHTML = "<tr>"+search+"</tr>"; 
        twoCell.innerHTML = "<p>This is me</p>";
        
        //ImageName.innerText = event.target.value;
    }

    if(!!search) {
        return (
       
            <div>
                <input onChange={addElements}></input>
                <DTable searchProp={search}/>
            </div>
        )
        
    }
    else {
    
        return(
            <div>
            <input onChange={addElements}></input>
            <div>Not anything</div>
            </div>
        )
    
    }
}
