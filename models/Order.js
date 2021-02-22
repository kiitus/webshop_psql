const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/database")
const OrderItem = require("./OrderItem")
//const sequelize = new Sequelize('sqlite::memory:');


//Sended orders

const Order = sequelize.define('Order', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false

  }
}, {
  // Other model options go here
});

//Oder has many items, If you delte order it will delete orderItems
Order.hasMany(OrderItem,{onDelete: 'CASCADE'})
module.exports = Order