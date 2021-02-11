const express = require("express")
const bodyParser = require("body-parser")
const Product = require("./models/Product")
const Order = require("./models/Order")
const OrderItem = require("./models/OrderItem")

const cors = require('cors')
require('dotenv').config()

const productRouter = require("./controllers/product")
const orderRouter = require("./controllers/order")

const app = express()



const db = require("./config/database")

    db.authenticate().then(()=>{
    console.log('Connection has been established successfully.')
    }).catch((error)=>{
    console.error('Unable to connect to the database:', error)}) 
  

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{res.send("Toimii")})

app.use("/productBack",productRouter)
app.use("/orderBack", orderRouter)

const PORT= process.env.PORT || 3001

app.listen(PORT,db.sync().then(()=>{
    console.log("Server started on port "+PORT)
    console.log("Product table created")
}))