import AddItem from "./components/AddItem";
import Header from "./components/Header"
import Items from "./components/Items"
import ReadyOrders from "./components/ReadyOrders"
import {useState, useEffect} from "react"
import Order from "./components/Order";
import Info from "./components/Info"
import ProductDetails from "./components/ProductDetails"
import Footer from "./components/Footer"

import SearchItems from "./components/SearchItems"
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom"
import axios from 'axios';


function App() {

const [items, setItems] = useState([])
//const [searchedItems, setSearchedItems] = useState([])
const [order, setOrder] = useState([])
const [sendedOrders,setSendedOrders] = useState([])

//const adress = "http://localhost:3001/productBack/"
//const adressOrder = "http://localhost:3001/orderBack/"


const adress = "/productBack/"
const adressOrder = "/orderBack/"


useEffect(() => {
  axios.get(adress).then(products =>
    { 
      console.log(products.data)
    setItems( products.data)
   // setSearchedItems(products.data)
    }
  )  
}, [])

useEffect(() => {
  axios.get(adressOrder).then(orders =>
    { 
      console.log(orders.data)
    setSendedOrders( orders.data)
   // setSearchedItems(products.data)
    }
  )  
}, [])



  const addItem  = (text,price) =>{
 // let id = Math.floor(Math.random() * 1000);    
   

  let product = {text,price}
  
  axios.post(adress,product).then((saved_product)=>{
  

    let {id,text,price} = saved_product.data
    setItems(items.concat({id,text,price,amount:0}))
 // setSearchedItems(searchedItems.concat({id,text,price,amount:0})) 
  }).catch((error)=>
  {
    console.log(`axios error ${error}`)
  })
     
  
}

  const deleteItemFromItems = (id) =>
  {
    axios.delete(adress+`${id}`).then((msg)=>
    {
  
      setItems(items.filter((item) =>{
        return item.id !== id
      }))
    })
   

   /* setSearchedItems(searchedItems.filter((item) =>{
      return item.id !== id
    }))
    */
  }


  const deleteItemFromOrder = (id) =>
  {
    setOrder(order.filter((item)=>
    {
      return item.id!== id
    }))
  }

  const deleteOrder = (id) =>
  {
    axios.delete(`${adressOrder}/${id}`).then(()=>
    {
      setSendedOrders(sendedOrders.filter((order)=>
      {
        return order.id !== id
      }))
    })
  
  
  }
const addToOrder =(id,text,price,amount)=>
{

let isAready = order.some((item)=>
{
  return item.id === id
})


amount = parseInt(amount)
if(isAready){
console.log("Oli jo "+amount)

setOrder(order.map((item)=>item.id!==id?item:{...item,amount}))
}
else
setOrder(order.concat({id,text,price,amount}))

setItems(items.map((one)=>one.id===id?{...one,amount:0}:one))
}

const sendOrder =(name,order) =>
{
  let number = Math.floor(Math.random() * 10000);     
  let orderObject = {
    name,
    number,
    OrderItems:order
  }
  /*
  orderObject.OrderItems = orderObject.OrderItems.map((item)=>
  {
    return {...item,id:undefined}
  })
  */
  axios.post(adressOrder,orderObject).then((savedItems)=>
  {
    
    orderObject.id = savedItems.data[0].OrderId 
    console.log(`Order ID = ${orderObject.id}`)

    for(let i = 0; i < savedItems.data.length;i++)
    {
      console.log(i)
      orderObject.OrderItems[i].id =savedItems.data[i].id
    }

    /*
    orderObject.OrderItems = orderObject.OrderItems.map((item,index)=>
    {
      return {...item,id:index}
    })
    */
    
    setSendedOrders(sendedOrders.concat(orderObject))
    setOrder([])
    
  })

}

const filterFunctio = (filterText)=>
{
  if(filterText.length === 0)
  {
    axios.get(adress).then(products =>
    { 
      console.log(products.data)
    setItems( products.data)
    })
  }
  else 
  {
  
    axios.get(`${adress}/${filterText}`).then(products =>
    { 
      console.log(products.data)
    setItems( products.data)
    })
  }
}
  /*
  if(filterText.length===0)
  {
    setSearchedItems(items)
  }
  else
  {
   let filtered = items.filter((item)=>
   {
     return item.text.toLowerCase().includes(filterText.toLowerCase())
   })
  
   setSearchedItems(filtered)
   */
 
   const containerWholePage =
   {
    position: "relative",
    minHeight: "92vh"
   }
   const containerOtherThanFooter=
   {
    paddingBottom: "2.5rem"
   }
   const footer = {
    position: "absolute",
    bottom: "0",
    width: "100%",
    height: "2.5rem"
   }

  return (
    <div className="container" style={containerWholePage}>
    <div style ={containerOtherThanFooter}>
    <Header />
    <Router>
    <Link to="/" className="p-2">Products</Link>
    <Link to="/order" className="p-2">Order</Link>
    <Link to="/sended_orders" className="p-2">Sended orders</Link>

    <Switch>
    <Route exact path="/">
    <SearchItems products={items} filter={filterFunctio}/>
    <Items items={items} deleteItem={deleteItemFromItems} addToOrder={addToOrder}/>
    <AddItem onClick={addItem} />
    </Route>
    <Route path="/order">
    {order.length>0?
    <Order order={order} onClick={sendOrder} deleteItem={deleteItemFromOrder}/>
    :<Info text="Current order is empty"/>}  
    </Route>
    <Route path="/sended_orders">
    {sendedOrders.length > 0?  
    <ReadyOrders orders={sendedOrders} deleteOrder={deleteOrder} />
    :<Info text="There are no orders made"/>}
    </Route>
    <Route path="/Product/:id">
      <ProductDetails products={items}/>
    </Route>
    <Route path="/">
      <Info text="Error in site adress"/>
    </Route>
    </Switch>
     </Router>
     </div>
     <div style={footer}>
     <Footer text="This site is made using React,Axios, Node.js(express), Sequelize and PostgreSQL." />
     </div>
    </div>
   
  );
}

export default App;
