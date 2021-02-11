const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/database")
//const sequelize = new Sequelize('sqlite::memory:');

const Product = sequelize.define('Product', {
  // Model attributes are defined here
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false

  }
}, {
  // Other model options go here
});

module.exports = Product