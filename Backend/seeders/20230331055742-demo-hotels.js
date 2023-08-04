'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     */ 
      await queryInterface.bulkInsert('Hotels', [{  
          name: "HOTEL HILLTOP ",
      city: " MANALI",
      address: "Gurudwara Rd, near Mall Road, Model Town, Siyal, Manali, Himachal Pradesh 175131",
      category: 3,
      image: "http://res.cloudinary.com/dvnnernkr/image/upload/v1681620658/hotel/1681620657134_2023-04-01.jpg",
      price: 1154,
      createdAt: "2023-04-16T04:50:58.796Z",
      updatedAt: "2023-04-16T04:50:58.796Z",
      destroyTime: null,
      },
      {
        name: "Hotel Clarks Shiraz",
        city: "Agra",
        address: "54, Taj Rd, Agra Cantt, Idgah Colony, Agra, Uttar Pradesh 282001",
        category: 5,
        image: "http://res.cloudinary.com/dvnnernkr/image/upload/v1681621273/hotel/1681621271388_Aerial_Photo.jpg",
        price: 3348,
        createdAt: "2023-04-16T05:01:13.230Z",
        updatedAt: "2023-04-16T05:01:13.232Z",
        destroyTime: null,
      },
      {
        name: "Lemon Tree Premier",
        city: "Jaipur",
        address: "Behind Inox Cinema निर्वान मार्ग Behind Inox Cinema, Sindhi Colony, Bani Park, Jaipur, Rajasthan 302016",
        category: 4,
        image: "http://res.cloudinary.com/dvnnernkr/image/upload/v1681621555/hotel/1681621553689_unnamed_4.jpg",
        price: 2250,
        createdAt: "2023-04-16T05:05:55.174Z",
        updatedAt: "2023-04-16T05:05:55.176Z",
        destroyTime: null,
    },
    {
      name: "Fairfield by Marriott",
      city: "Goa",
      address: "Benaulim Beach Rd, Benaulim, Goa 403716",
      category: 5,
      image: "http://res.cloudinary.com/dvnnernkr/image/upload/v1681621841/hotel/1681621839992_2023-04-04.jpg",
      price: 9083,
      createdAt: "2023-04-16T05:10:41.869Z",
      updatedAt: "2023-04-16T05:10:41.871Z",
      destroyTime: null,
    
    }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     */ Example:
      await queryInterface.bulkDelete('Hotels', null, {});
     
  }
};
