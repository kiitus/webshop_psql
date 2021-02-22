import React from 'react'
import {useState} from "react"


//Form to search items on sale.
const SearchItems = ({products,filter}) => {
    const [text,setText] = useState("")

    const found = ()=>
    {
        filter(text)
    }
    return (
        <div className="pt-5">
         Search products on sale   <input value={text} onChange={({target}) => setText(target.value)}></input> <button value="submit" onClick={found}>Search</button>
        </div>
    )
}

export default SearchItems
