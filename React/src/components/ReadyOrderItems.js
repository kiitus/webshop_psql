import React from 'react'

//Shows items in orders which are sended to shop

const ReadyOrderItems = ({item}) => {
    return (
        <tr>
        <td>{item.text}</td><td>{item.price}</td><td>{item.amount}</td><td>{(item.price * item.amount).toFixed(2)}</td>
        </tr>
    )
}

export default ReadyOrderItems
