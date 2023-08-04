const express = require('express') 
const router = express.Router();
const controller =  require('../controllers/user')
const validateUser = require('../middlewares/userAuth')
const upload = require('../middlewares/mult')

router.get('/users',validateUser,controller.getUsers)
router.get('/user/:id',controller.getUserById)
router.post('/register',upload.single('image'),controller.registration)
router.post('/login',controller.login)
router.get('/currentUser',validateUser,controller.currentUser)
router.get('/logOut',controller.logOut)
router.get('/image',controller.Image)
router.get('/tables',controller.tables)
module.exports = router