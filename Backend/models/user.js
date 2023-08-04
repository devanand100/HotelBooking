'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Hotel,{
        through:"Booking",
        foreignKey:"u_id",
        as:"userme"
      })
    }
  }
  User.init({
    firstName:{
       type:DataTypes.STRING,
    },
    lastName:{
      type:DataTypes.STRING,
   },
    fullName:{
      type: DataTypes.VIRTUAL,
      get(){
        return `${(this.firstName)} ${(this.lastName)}`;
      },
      set(value){
        throw new Error ("Do not try Set Fullname")
      }
    },
    email:{ 
      type:DataTypes.STRING,
      unique: true,
      validate:{
      isEmail: true  
      },
      set(value){
        let email = value.toLowerCase();
        this.setDataValue('email',email)
      }
    },
    password:{ 
      type:DataTypes.STRING,
      set(value){
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue('password',hash)
      }
    },
    image: {
      type:DataTypes.STRING,
      defaultValue:"/avatar.png"
    },
    isAdmin:{
      type:DataTypes.BOOLEAN,
      defaultValue:false},
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};