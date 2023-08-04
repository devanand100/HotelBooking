'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Hotel,{foreignKey:'h_id'});
      this.belongsTo(models.User,{foreignKey:'u_id'})
    }
  }
  Booking.init({
    u_id: DataTypes.INTEGER,
    h_id: DataTypes.INTEGER,
    checkOut: DataTypes.DATE,
    checkIn: DataTypes.DATE,
    rooms: {
      type:DataTypes.INTEGER,
      defaultValue:1
    },
    total:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};