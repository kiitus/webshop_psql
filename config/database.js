const { Sequelize, Model } = require('sequelize');

require('dotenv').config()

/*
// Option 2: Passing parameters separately (other dialects)
module.exports = new Sequelize(process.env.DATABASE,process.env.USER,process.env.PWORD, {
  host: 'localhost',
  dialect: 'postgres'
});
*/

module.exports = new Sequelize(process.env.DATABASE_URL, {
 // logging: false,
  dialectOptions: {
    ssl: true /* for SSL config since Heroku gives you this out of the box */
  }
});

  