import React from 'react'
import {FaTimes} from "react-icons/fa"
import {useState} from "react"
import {Link} from "react-router-dom"

const Item = ({item,deleteItem,addToOrder}) => {

    const [amount, setAmount] = useState(0)

    let linkText =`/Product/${item.id}`
    const add = ()=>
    {
        
        addToOrder(item.id,item.text,item.price,amount)
        setAmount(0)
    }

    return (
    
            <tr>
          <td>{item.text}</td><td>{item.price}€</td><td><input type="number" value={amount} min="0" max="20" step="1" onChange={({target}) => setAmount(target.value)}></input></td><td onClick={add}>{amount >0?<> Order <FaTimes style={{color:"green"}} /></>:<></>}</td><td onClick={()=>deleteItem(item.id)}>Remove<FaTimes style={{color:"red"}} /></td><td><Link to={linkText}>Detail</Link> </td>

          </tr> 
    )
}

export default Item