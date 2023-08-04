'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Amenities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Hotel,{as: 'Amenities',foreignKey:'h_id'})
      // define association here
    }
  }
  Amenities.init({
    h_id: DataTypes.INTEGER,
    wifi:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    concierge: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    parking:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    dumbbell: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    spa:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    pool: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue:new Date()
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue:new Date()
    }
  }, {
    sequelize,
    modelName: 'Amenities',
  });
  return Amenities;
};