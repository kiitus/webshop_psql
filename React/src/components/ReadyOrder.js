import React from 'react'
import {FaTimes} from "react-icons/fa"

import ReadyOrderItems from "./ReadyOrderItems"

//Includes order which are sended to the shop


const ReadyOrder = ({order,deleteOrder}) => {
    let totalPrice = order.OrderItems.reduce((total,one) =>
    {
        return total+= (one.price * one.amount)
    },0)
   
    return (
        <div>
            <div>
            <h4 className="pt-3"><span className="p-3">Name: {order.name}</span> OrderID: {order.number} <FaTimes style={{color:"red"}} onClick={()=>deleteOrder(order.id)}/></h4>
            <table className="table">
            <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Total Price</th>
            </tr>
            </thead>
            <tbody>
            {order.OrderItems.map((one)=>
            {
                console.log({one})
              return  <ReadyOrderItems key={one.id} item={one} />
        
            })}
            <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
           <b> {totalPrice.toFixed(2)}</b>
            </td>
            </tr>
            </tbody>
            </table>
            
        </div>
            
        </div>
    )
}

export default ReadyOrder
