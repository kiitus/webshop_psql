const productRouter = require('express').Router()
const Product = require('../models/Product')
const { Op, Sequelize } = require("sequelize");


//Loads products to shop 
productRouter.get("/",(req,res)=>
{

    Product.findAll().then((products)=>
    {
        console.log(products)
        res.send(products)
    })
})

//Gets one product information
productRouter.get("/id/:id",(req,res)=>
{
    let id = req.params.id

    Product.findOne({ where: { id} }).then((result)=>{
        res.send(result)
    })
})


//Search items which include search params(*search*)
productRouter.get("/:search",(req,res)=>
{
    let search = req.params.search

   Product.findAll({where: { text: {
        [Op.iLike]: `%${search}%`}}}).then((products)=>
    {

        res.send(products)
    })
 
})

//Inserts new product to shop
productRouter.post("/",(req,res)=>
{
    let {text,price} = req.body


    let item = Product.build({text,price})

    item.save().then((product)=>
    {
        res.send(product)
    }).catch((error)=>
    {

        res.send(error)
    })
})

//Delete product from shop
productRouter.delete("/:id",(req,res)=>
{
    let id = req.params.id

    Product.destroy({
        where: {
          id }
    }).then((msg)=>
        {
            
            res.send("")
        }).catch(error=>
            {
                res.send(error)

            })
})

module.exports = productRouter