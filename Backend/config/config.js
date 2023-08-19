const fs = require('fs');

module.exports = {
  development: {
    username: 'postgres',
    password: '12345',
    database: 'HotelBooking',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username:'devanand',
    password:'ToKVx3lMjInMTiv6ZIUS2wSnipvMVx5u',
    database: 'hotelbooking_4pj2',
    host:'dpg-cjg7f8k1ja0c73ah2h5g-a',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl:true,
      bigNumberStrings: true
    }
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
      // ssl: {
      //   ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt')
      // }
    }
  }
};