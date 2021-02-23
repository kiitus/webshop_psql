import React from 'react'
import {useState} from "react"

//Component which is used to add item to sale

const AddItem = ({onClick}) => {
    const [text, setText] = useState("")
    const [price, setPrice] = useState(1)

    const addItem = (event)=>
    {
        event.preventDefault()
        if(text.length>0)
        {
        onClick(text,price)
        setText("")
        setPrice(1)
        }
    }

    return (
        <div>
        <h3>Add product for sale</h3>'
        <form className="form-inline">
        <div className="form-group mb-2">
          Product:<input type="text" value={text} onChange={({target}) => setText(target.value)}></input>
          </div>
        <div className="form-group mx-sm-3 mb-2">
          Price:  <input type="number" value={price} min="0" max="1000" step="0.01"  onChange={({target}) => setPrice(target.value)}></input>€
          </div>
          <button className="btn btn-primary" onClick={addItem}>Add product</button>
          </form>
        </div>
    )
}

export default AddItem
