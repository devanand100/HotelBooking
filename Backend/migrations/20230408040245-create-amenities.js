'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Amenities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      h_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"Hotels",
          key:'id'
        },
        onDelete: "CASCADE"
      },
      wifi: {
        type: Sequelize.BOOLEAN
      },
      concierge: {
        type: Sequelize.BOOLEAN
      },
      parking: {
        type: Sequelize.BOOLEAN
      },
      dumbbell: {
        type: Sequelize.BOOLEAN
      },
      spa: {
        type: Sequelize.BOOLEAN
      },
      pool: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Amenities');
  }
};