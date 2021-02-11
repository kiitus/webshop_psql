const orderRouter = require('express').Router()
const Order = require('../models/Order')
const OrderItem = require("../models/OrderItem")
const { Op, Sequelize } = require("sequelize");

orderRouter.get("/", (req, res) => {
    let orders = Order.findAll({ include: OrderItem }).then((result) => {
        console.log(result)
        res.send(result)
    })
})

orderRouter.post("/", (req, res) => {
    let { name, number, OrderItems } = req.body

    let o = Order.build({ name, number })

    o.save().then((saved_order) => {

        OrderItems = OrderItems.map(item => {
            return { ...item, OrderId: saved_order.id, id: undefined }
        });

        console.table(OrderItems)
        OrderItem.bulkCreate(OrderItems).then((saved_items) => {
            //res.send(saved_order)
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