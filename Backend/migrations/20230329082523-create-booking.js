'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      u_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"Users",
          key:'id'
        },
        onDelete: "CASCADE"
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
      rooms:{
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue:1,
      }, 
      total:{
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      checkIn: {
        allowNull: false,
        type: Sequelize.DATE
      },
      checkOut: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Bookings');
  }
};