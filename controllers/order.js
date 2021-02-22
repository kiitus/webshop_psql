const orderRouter = require('express').Router()
const Order = require('../models/Order')
const OrderItem = require("../models/OrderItem")
const { Op, Sequelize } = require("sequelize");

//Gets all sended orders with products
orderRouter.get("/", (req, res) => {
    let orders = Order.findAll({ include: OrderItem }).then((result) => {
        console.log(result)
        res.send(result)
    })
})

//Saves order
orderRouter.post("/", (req, res) => {
    let { name, number, OrderItems } = req.body

    //Orders information (order number and name of the orderer)
    let o = Order.build({ name, number })

    o.save().then((saved_order) => {

        //Changes items which belong to order, order id to right one 
        OrderItems = OrderItems.map(item => {
            return { ...item, OrderId: saved_order.id, id: undefined }
        });

        //Saves items to database
        OrderItem.bulkCreate(OrderItems).then((saved_items) => {

            res.send(saved_items)
        }).catch((error) => {
            console.log("Error itemeissä =" + error)
        });



    }).catch((error) => {
        console.log("Error orderissa =" + error)
    })

})


orderRouter.delete("/:id", (req, res) => {
    let id = req.params.id

    Order.destroy({
        where: {
            id
        }
    }).then((msg) => {

        res.send("")
    }).catch(error => {
        res.send(error)

    })
})
module.exports = orderRouter