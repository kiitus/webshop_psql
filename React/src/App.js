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

const [items, setItems] = useState([])    //Product that are listed on sale

const [order, setOrder] = useState([])    //Order which is "in-progress"
const [sendedOrders,setSendedOrders] = useState([]) //Orders which are sended to shop

//const adress = "http://localhost:3001/productBack/"
//const adressOrder = "http://localhost:3001/orderBack/"


const adress = "/productBack/"
const adressOrder = "/orderBack/"


useEffect(() => {     //Loads all products which are on sale
  axios.get(adress).then(products =>
    { 
      console.log(products.data)
    setItems( products.data)
   // setSearchedItems(products.data)
    }
  )  
}, [])

useEffect(() => {     //Loads all orders which are sended to shop
  axios.get(adressOrder).then(orders =>
    { 
      console.log(orders.data)
    setSendedOrders( orders.data)
   // setSearchedItems(products.data)
    }
  )  
}, [])



  const addItem  = (text,price) =>{   //Used to add product to sale
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

//Delete item from sale
  const deleteItemFromItems = (id) =>
  {
    axios.delete(adress+`${id}`).then((msg)=>
    {
  
      setItems(items.filter((item) =>{
        return item.id !== id
      }))
    })
   
  }


  //Deletes product from order "in-progress"
  const deleteItemFromOrder = (id) =>
  {
    setOrder(order.filter((item)=>
    {
      return item.id!== id
    }))
  }

  //Deletes order which is sended to shop
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

  //Adds product to order "in-progress"
const addToOrder =(id,text,price,amount)=>
{

let isAready = order.some((item)=>
{
  return item.id === id
})


amount = parseInt(amount)
if(isAready){

setOrder(order.map((item)=>item.id!==id?item:{...item,amount}))
}
else
setOrder(order.concat({id,text,price,amount}))

setItems(items.map((one)=>one.id===id?{...one,amount:0}:one))
}

//Send oder "in-progerss" to shop
const sendOrder =(name,order) =>
{
  let number = Math.floor(Math.random() * 10000);     
  let orderObject = {
    name,
    number,
    OrderItems:order    //Products in order
  }
  /*
  orderObject.OrderItems = orderObject.OrderItems.map((item)=>
  {
    return {...item,id:undefined}
  })
  */
  axios.post(adressOrder,orderObject).then((savedItems)=>
  {
    //Syncs frontend ids with database ones
    orderObject.id = savedItems.data[0].OrderId 

    for(let i = 0; i < savedItems.data.length;i++)
    {
      orderObject.OrderItems[i].id =savedItems.data[i].id
    }

    /*
    orderObject.OrderItems = orderObject.OrderItems.map((item,index)=>
    {
      return {...item,id:index}
    })
    */
    
    //Moves "in-progress" order to sended ones
    setSendedOrders(sendedOrders.concat(orderObject))
    setOrder([])
    
  })

}

//Functio to search products on sale
const filterFunctio = (filterText)=>
{
  //If empty, show all
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
    //Search string between word
    axios.get(`${adress}/${filterText}`).then(products =>
    { 
      console.log(products.data)
    setItems( products.data)
    })
  }
}
  
 
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
      //Manage product, add, remove and include to order
    <Route exact path="/">  
    <SearchItems products={items} filter={filterFunctio}/>
    <Items items={items} deleteItem={deleteItemFromItems} addToOrder={addToOrder}/>
    <AddItem onClick={addItem} />
    </Route>

    //Order "in-progress"
    <Route path="/order">
    {order.length>0?
    <Order order={order} onClick={sendOrder} deleteItem={deleteItemFromOrder}/>
    :<Info text="Current order is empty"/>}  
    </Route>

      //Orders that are sended to shop
    <Route path="/sended_orders">
    {sendedOrders.length > 0?  
    <ReadyOrders orders={sendedOrders} deleteOrder={deleteOrder} />
    :<Info text="There are no orders made"/>}
    </Route>

      //Shows details about product
    <Route path="/Product/:id">
      <ProductDetails products={items}/>
    </Route>

      //Error in adress
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
