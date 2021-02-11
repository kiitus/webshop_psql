import React from 'react'
import {FaTimes} from "react-icons/fa"

const OrderItem = ({item,deleteItem}) => {
    return (
    
            <tr>
           <td>{item.text}</td><td>{item.price}</td><td>{item.amount}</td><td>{(item.price * item.amount).toFixed(2)}</td><td onClick={()=>deleteItem(item.id)}>Remove<FaTimes style={{color:"red"}} /></td>
           </tr>
        
    )
}

export default OrderItem
