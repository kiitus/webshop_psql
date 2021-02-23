import React from 'react'
import Item from "./Item"

// Shows all products which are on sale

const Items = ({items,deleteItem,addToOrder}) => {
    return (
    <div className="pt-5">
    
          {items.length>0? <>
            <h3>Products on sale </h3>
            <div >
            <table className="table">
            <thead className="thead-dark">
    <tr>
      <th scope="col">Product</th>
      <th scope="col">Price</th>
      <th scope="col">Amount</th>
      <th scope="col">Order</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>


            
                <tbody>
            {items.map((item)=>
            {
              return  <Item key={item.id} item={item} deleteItem={deleteItem} addToOrder={addToOrder}/>
            })}
            </tbody>
            </table></div></>:<></>}
            
        </div>
    )
}

export default Items
