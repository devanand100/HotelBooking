const db = require("../models");
const Booking = db.Booking;
const User = db.User;
const Hotel = db.Hotel
const Amenitie = db.Amenities
const asyncHandler = require('express-async-handler');
const { Op } = require("sequelize");

const bookings = asyncHandler(async(req,res)=>{
    const uid = Number(req.params.id);
    
    if(req.data.id !== uid){
        res.status(401)
       throw new Error("User is not Authorized on token")
    }
    const Allbookings = await Booking.findAll({
        include:[{
            model:Hotel,
            paranoid: false,
            include: {
                model: Amenitie ,
                as: 'Amenities'
              }
        }],
        where:{
            u_id:uid
        },
        // attributes:{
        //     exclude:["createdAt","updatedAt"]
        // },
    })
    console.log(Allbookings)
    return res.status(200).json(Allbookings)
})

const addBookings = asyncHandler(async(req,res)=>{
    console.log(req.body)
    const uid = Number(req.params.id);
   
    const { h_id, checkOut,checkIn,rooms ,total} = req.body;

    if(!h_id,!checkOut,!checkIn){
        res.status(400)
        throw new Error('all fields are required')
    }
    
    const booked = await Booking.findOne({
        where: {
          u_id: uid,
          h_id: h_id,
          checkIn: {
            [Op.lte]: new Date(checkOut)
          },
          checkOut: {
            [Op.gte]: new Date(checkIn)
          }
        }
      });
      if (booked) {
         res.status(400)
         throw new Error('already booked a hotel for the given dates')
      }
    
    const newBooking = await Booking.create({
        u_id:uid,
        h_id:h_id,
        rooms:rooms,
        total:total,
        checkIn: new Date(checkIn),
        checkOut: new Date(checkOut),
        createdAt: new Date(),
        updatedAt: new Date()
    })
      res.status(200).json(newBooking)
})

const Allbookings = asyncHandler(async(req,res)=>{
    
    if(!req.data.isAdmin){
        res.status(403)
        throw new Error('Only Admin can view Bookings')
    }
    const Allbookings = await Booking.findAll({
        include:[{
                model:Hotel,
                paranoid:false
            },
            {
                model:User,           
            }
        ], 
       
        required: true,       
        attributes:{
            exclude:["createdAt","updatedAt"]
        },
    })
    return res.status(200).json(Allbookings)
})

module.exports = {
    bookings,
    addBookings,
    Allbookings
}