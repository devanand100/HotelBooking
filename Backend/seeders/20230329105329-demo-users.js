'use strict';
const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
      await queryInterface.bulkInsert('Users', [{
        firstName: "admin",
        lastName:"admin",
        email: "admin@mail.com",
        password:bcrypt.hashSync('12345',10),
        image: "profile/1681545546102_8b167af653c2399dd93b952a48740620",
        isAdmin:true,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      firstName: "Devanand",
      lastName:"Kariya",
      email: "dk@mail.com",
      password: bcrypt.hashSync("123",10),
      image: "profile/1681545546102_8b167af653c2399dd93b952a48740620",
      isAdmin:false,
      createdAt: new Date(),
      updatedAt: new Date()
   }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example: */
      await queryInterface.bulkDelete('Users', null, {});
     
  }
};
