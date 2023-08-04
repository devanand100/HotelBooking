const db = require("../models");
const Hotel = db.Hotel;
const Amenitie = db.Amenities
const asyncHandler = require('express-async-handler');
const { Op, Sequelize } = require("sequelize");
const {uploads} = require('../middlewares/cloudinary')

const getHotels = asyncHandler(async (req,res) => {
    const hotels = await Hotel.findAll({
        include:{
        model:Amenitie,
        as: 'Amenities'
    }
    });
    res.json(hotels);
})

const searchHotels = asyncHandler(async (req,res) => {
    const text = req.params.text
    const hotels = await Hotel.findAll({
        where:{
            [Op.or]:[
           { city:{[Op.iLike]:'%'+text+'%'}},
           { name:{[Op.iLike]:'%'+text+'%'}},
        ]}
    });
    res.json(hotels);
})


const addHotel = asyncHandler(async (req,res) => {
    
    console.log(req.body)
    let {path} = req.file

    if(!req.data.isAdmin){
        res.status(401)
        throw new Error('Only Admin can create Hotel')
    }
    let result  = await uploads(path,"hotel")

    let {name,city,address,category,price,Amenities}  = req.body
   
    Amenities = JSON.parse(Amenities)
    if(!name || !city || !address || !category || !price ){
        res.status(400);
        throw new Error("All fields Are Mandatory");
    }
    const hotel = await Hotel.create({
        name:name,
        city:city,
        address:address,
        category:category,
        image:result.url,
        price:price,
        createdAt: new Date(),
        updatedAt: new Date()
    })
   
const {wifi,concierge,parking,dumbbell,spa,pool} = Amenities

    const amenityy = await Amenitie.create({
         h_id : hotel.id,
         wifi : wifi,
         concierge : concierge,
         parking : parking,
         dumbbell : dumbbell,
         spa : spa,
         pool : pool
    })
    res.json(hotel)
})

 const updateHotel = asyncHandler(async(req,res) => {
    if(!req.data.isAdmin){
        res.status(401)
        throw new Error('Only Admin can update Hotel')
    }

    let path;
    let result;
    if(req.file){
    path = req.file.path
    result  = await uploads(path,"hotel")
    }
    
    const {Amenities,...rest} = req.body

       
    if(result){
        rest.image = result.url
    }
    // image: change
    const updatedHotel = await Hotel.update({...rest  ,updatedAt:new Date()},{
        where:{
            id:Number(req.params.id)
        }
     })

     const updateAemenities = await Amenitie.update(Amenities,{
        where:{
            h_id:Number(req.params.id)
        }
     })

     
     res.status(200).json(updatedHotel)
 })

 const deletHotel = asyncHandler(async(req,res) => {
    if(!req.data.isAdmin){
        res.status(401)
        throw new Error('Only Admin can create Hotel')
    }
    // if(isNaN(req.params.id)){
    //     res.status(400)
    //     throw new Error ("parameter  should be Number")
    // }

    const deletedHotel = await Hotel.destroy({
        where:{
            id:req.params.id
        },
        paranoid: true,
    }) 
    res.status(200).json(deletedHotel)
 })

 const filterHotel = asyncHandler(async(req,res)=>{
    const category =Number(req.query.category)
     const city = req.query.city 
    let hotels;
    if(category && city){
     hotels =await Hotel.findAll({
        where:{
            [Op.and]:[
                {
                    [Op.or]:[
                        { city:{[Op.iLike]:'%'+city+'%'}},
                        { name:{[Op.iLike]:'%'+city+'%'}}
                    ]
                },
           { category:category},
        ]},
        attributes:{
            exclude:["createdAt","updatedAt","deletedAt"]
        },
        include:[{
            model:Amenitie,
            as: 'Amenities',
            attributes:{
                exclude:["createdAt","updatedAt"]
            }
        }]
        
 })}
    if(category && !city){
        hotels =await Hotel.findAll({
            where :{
                 category:category,
            },
            attributes:{
                exclude:["createdAt","updatedAt","deletedAt"]
            },
            include:[{
                model:Amenitie,
                as: 'Amenities',
                attributes:{
                    exclude:["createdAt","updatedAt"]
                }
            }]
     })
    }

    
    if(!category && city){
        hotels =await Hotel.findAll({
            where :{
                [Op.or]:[
                    { city:{[Op.iLike]:'%'+city+'%'}},
                    { name:{[Op.iLike]:'%'+city+'%'}}
                ],        
                },
                attributes:{
                    exclude:["createdAt","updatedAt","deletedAt"]
                },
                include:[{
                    model:Amenitie,
                    as: 'Amenities',
                    attributes:{
                        exclude:["createdAt","updatedAt"]
                    }
                }]
     })
    }
    res.status(200).json(hotels)
 })



 const categories = asyncHandler(async (req,res)=>{
    const categs = await Hotel.findAll({
        attributes:[Sequelize.fn('DISTINCT',Sequelize.col('category')),'category']
    }
    )
    let array = new Array();
    categs.forEach(element => {
        array.push(element.category)
    });
    res.json(array)
 })

 const getHotel = asyncHandler(async (req,res) => {
    const hotels = await Hotel.findOne({
        where:{
            id:req.params.id
        },
        attributes:{
            exclude:["createdAt","deletedAt","updatedAt","destroyTime"]
        },
        include:{
            model:Amenitie,
            as: 'Amenities'
        },    
    });
    res.json(hotels);
})
module.exports =
 {
    getHotels,
    searchHotels,
    addHotel,
    updateHotel,
    deletHotel,
    filterHotel,
    categories,
    getHotel
 }