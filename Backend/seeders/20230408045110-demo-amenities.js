'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
     await queryInterface.bulkInsert('Amenities', [{
      h_id: 1,
      wifi: false,
      concierge: true,
      parking: true,
      dumbbell: false,
      spa: false,
      pool: false,
      createdAt: "2023-04-16T03:21:16.733Z",
      updatedAt: "2023-04-16T03:21:16.733Z"

      },
      {
        h_id: 2,
        wifi: true,
        concierge: true,
        parking: true,
        dumbbell: false,
        spa: true,
        pool: true,
        createdAt: "2023-04-16T04:58:48.492Z",
        updatedAt: "2023-04-16T04:58:48.492Z"
        },
        {
          h_id: 3,
          wifi: true,
          concierge: false,
          parking: true,
          dumbbell: false,
          spa: true,
          pool: true,
          createdAt: "2023-04-16T05:03:24.861Z",
          updatedAt: "2023-04-16T05:03:24.861Z"
      },
      {
          h_id: 4,
          wifi: true,
          concierge: true,
          parking: true,
          dumbbell: true,
          spa: true,
          pool: true,
          createdAt: "2023-04-16T05:08:02.327Z",
          updatedAt: "2023-04-16T05:08:02.327Z"
      }
      ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example: */
     await queryInterface.bulkDelete('Amenities', null, {});
    
  }
};
