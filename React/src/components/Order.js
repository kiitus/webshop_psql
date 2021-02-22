import React from 'react'
import OrderItem from './OrderItem'
import {useState} from "react"


//Shows order whcih is "in-progress". Can be sended to shop. Must give orderer

const Order = ({order,onClick,deleteItem}) => {


    const [name, setName] = useState("")

    let totalPrice = order.reduce((total,unit)=>
    {
    
        return total += (unit.price * unit.amount)
    },0)

    return (
        <div className="pt-3">
            <h2>Current order</h2>

            <table className="table">
                <thead>
                <tr>
                    <th>Producet</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>Total price</th>
                </tr>
                </thead>
                <tbody>
            {order.map((item)=>
                {
                  return <OrderItem key={item.id} item={item} deleteItem={deleteItem}/>
                })}
                <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>
            <b>{totalPrice.toFixed(2)}
            </b>
            </td>
            </tr>
            </tbody>
            </table>
            
            Name of the orderer <input type="text" value={name} onChange={({target}) => setName(target.value)}></input>
            <button className="btn btn-primary" onClick={()=>onClick(name,order)}>Send order</button>
        </div>
    )
            
}

export default Order
