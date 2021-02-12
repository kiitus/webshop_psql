const { Sequelize, Model } = require('sequelize');

require('dotenv').config()

// Option 2: Passing parameters separately (other dialects)
module.exports = new Sequelize(process.env.DATABASE,process.env.USER,process.env.PWORD, {
  host: 'localhost',
  dialect: 'postgres'
});


  