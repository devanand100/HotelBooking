'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
       * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    this.hasOne(models.Amenities,{as: 'Amenities', foreignKey:'h_id'}
    )
      this.belongsToMany(models.User,{
        through:"Booking",
        foreignKey:'h_id'
       })
    }
  }
  Hotel.init({
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    category: DataTypes.INTEGER,
    image: {
      type:DataTypes.STRING,
  
    },
    price: DataTypes.INTEGER
  },
  {
    sequelize,
    modelName: 'Hotel',
    paranoid: true,
    deletedAt: 'destroyTime'
  });
  return Hotel;
};