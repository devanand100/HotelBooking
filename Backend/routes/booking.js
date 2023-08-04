const express = require('express') 
const router = express.Router();
const {bookings, Allbookings,addBookings} = require('../controllers/booking')
const validateUser = require('../middlewares/userAuth')

router.get('/allBookings/:id',validateUser,bookings)
router.get('/allBookings',validateUser,Allbookings)
router.post('/addBooking/:id',validateUser,addBookings)
module.exports = router