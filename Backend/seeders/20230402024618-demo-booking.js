'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */ await queryInterface.bulkInsert('Bookings', [{
    
      
      u_id: 2,
      h_id: 1,
      checkIn:new Date(2023,3,6),
      checkOut: new Date(2023,3,7),
      rooms: 2,
      total:3400,
      createdAt: new Date(),
        updatedAt: new Date()
      },
      {
      u_id: 2,
      h_id: 2,
      checkIn:new Date(2023,4,5),
      checkOut: new Date(2023,4,8),
      rooms: 5,
      total:5600,
      createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}); 
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * 
     * */
     await queryInterface.bulkDelete('Bookings', null, {});
     
  }
};
