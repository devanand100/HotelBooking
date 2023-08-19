'use strict';
const dotenv = require('dotenv').config()

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

console.log(config);
let sequelize =  new Sequelize('postgres://devanand:ToKVx3lMjInMTiv6ZIUS2wSnipvMVx5u@dpg-cjg7f8k1ja0c73ah2h5g-a/hotelbooking_4pj2',{dialectOptions: {
        ssl:  {
          require: true,
          rejectUnauthorized: false
        }
      }
    })



// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
  
//   console.log(config)
//   sequelize = new Sequelize(config.database, config.username, config.password,{
//     dialect: 'postgres',
//     // dialectOptions: {
//     //   ssl:  {
//     //     require: true,
//     //     rejectUnauthorized: false
//     //   }
//     // }
//   });
// }


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.authenticate()
.then(()=> {
    console.log('Connected')
}).catch((err) =>{
    console.log(err)
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db ;
