const productRouter = require('express').Router()
const Product = require('../models/Product')
const { Op, Sequelize } = require("sequelize");


productRouter.get("/",(req,res)=>
{

    Product.findAll().then((products)=>
    {
        console.log(products)
        res.send(products)
    })
})

productRouter.get("/:search",(req,res)=>
{
    let search = req.params.search

   Product.findAll({where: { text: {
        [Op.iLike]: `%${search}%`}}}).then((products)=>
    {

        res.send(products)
    })
 
})

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