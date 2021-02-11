import React from 'react'
import ReadyOrder from "./ReadyOrder"


const ReadyOrders = ({orders,deleteOrder}) => {

    
    return (
    <div>
        {orders.map((one)=>
        {
            return <ReadyOrder key={one.id} order={one} deleteOrder={deleteOrder}/>
        })}
    </div>
    )
    
}

export default ReadyOrders
