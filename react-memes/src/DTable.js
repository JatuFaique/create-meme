import React from 'react'


export default function DTable(props) {
    console.log(props)
    // var dTable = document.querySelector(".dynamicTable");
    // console.log(dTable)
    // var nrow = dTable.insertRow(-1);
    // var oneCell = nrow.insertCell(0)
    // var twoCell = nrow.insertCell(1)

    // oneCell.innerHTML = "<tr>"+props.searchProp+"</tr>"; 
    // twoCell.innerHTML = "<p>This is me</p>";

    
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
