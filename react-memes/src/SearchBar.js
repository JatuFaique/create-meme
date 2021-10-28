import React from 'react'

export default function SearchBar() {
    function onchange(event){
        console.log(event.target.value);
        addElements()
    }

    function addElements(){
        var ImageName = document.querySelector(".image-name");
        ImageName.innerText = "Hahhaaha";
    }
    return (
        <div>
            <input onChange={onchange}></input>
        </div>
    )
}
