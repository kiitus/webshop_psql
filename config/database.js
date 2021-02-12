const { Sequelize, Model } = require('sequelize');

require('dotenv').config()

// Option 2: Passing parameters separately (other dialects)
/*module.exports = new Sequelize(process.env.DATABASE,process.env.USER,process.env.PWORD, {
  host: 'localhost',
  dialect: 'postgres'
});*/

/*module.exports =  new Sequelize("dflgha1dnv2mj0","svcjxbgyljqcfb","26a8034296e464ad6360e1c924e5ae62e92fd09ff2b60060f6e5e479ee86b01e",
  {
  host:"ec2-108-128-104-50.eu-west-1.compute.amazonaws.com",
  dialect: 'postgres',
  protocol: 'postgres',
  ssl: { rejectUnauthorized: false }
})*/

/*module.exports =  new Sequelize(process.env.DATABASE_URL,
  {
  dialect: 'postgres',
  protocol: 'postgres',
  //ssl: { rejectUnauthorized: false }})
  }) */

  sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialectOptions: {
      ssl: true /* for SSL config since Heroku gives you this out of the box */
    }
  });
  

  