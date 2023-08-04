const express = require('express') 
const router = express.Router();
const controller = require('../controllers/hotel')
const validateUser = require('../middlewares/userAuth')
const upload = require('../middlewares/mult')
const addHotelImage = require('../controllers/image')
router.get('/hotels',controller.getHotels)
router.get('/search/:text',controller.searchHotels)
router.post('/addHotel',validateUser,upload.single('image'),controller.addHotel)
router.patch('/updateHotel/:id',validateUser,upload.single('image'),controller.updateHotel)
// upload.single Change on upper
router.delete('/deleteHotel/:id',validateUser,controller.deletHotel)
router.get('/filter',controller.filterHotel)
router.get('/categories',controller.categories)
router.get('/:id',controller.getHotel)
router.post('/upload/:id',validateUser,upload.single('image'),addHotelImage)

module.exports = router;