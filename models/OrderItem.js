const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/database")
const Order = require("./Order")
//const sequelize = new Sequelize('sqlite::memory:');


//Items that belong to order


const OrderItem = sequelize.define(`OrderItem`, {
  // Model attributes are defined here
  text: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    unique: false
  },
  amount: {
      type:DataTypes.INTEGER,
      allowNull: false,
      unique: false
  }
}, {
  // Other model options go here
});

//OrderItem.belongsTo(Order);
module.exports = OrderItem