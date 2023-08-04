const {uploads} = require('../middlewares/cloudinary')
const db = require("../models");
const Hotel = db.Hotel;
const asyncHandler = require('express-async-handler');

const addHotelImage = asyncHandler(async (req,res) => {
    let {path} = req.file

    if(!req.data.isAdmin){
        res.status(403)
        throw new Error('Only Admin can create Hotel')
    }
    let result  = await uploads(path,"hotel")

    let imageUrl = {image:result.url}

    const updateAemenities = await Hotel.update(imageUrl,{
        where:{
            id:Number(req.params.id)
        }
     })
     res.status(200).json("done")
 })


module.exports = addHotelImage;