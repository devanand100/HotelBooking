const { Op } = require("sequelize");
const { sequelize } = require("../models");
const Sequelize = require('sequelize');

const db = require("../models");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = db.User;
const {uploads} = require('../middlewares/cloudinary')
const {getImage} = require('../middlewares/cloudinary')
const getUsers = asyncHandler( async (req, res) => {
    if(!req.data.isAdmin){
        res.status(403)
        throw new Error('Only Admin can Access Users')
    }
    const users = await User.findAll({
           attributes:['id','firstName',"lastName","image",'email',"isAdmin"]
        //  attributes:[sequelize.fn('COUNT',sequelize.col('id')]
        //  attributes:[[sequelize.fn('min',sequelize.col('id')),'maxid']]
        //    attributes:['fullName',[sequelize.fn('min',sequelize.col('id')),'maxID'],'email']
        // ,raw:true
        // attributes: ["id", [sequelize.fn("count", sequelize.col("id")), "count"]],
        // group: ["User.id"],
        // order: sequelize.literal(["count DESC"]),
    });
    res.status(200).json(users);
});

const getUserById = asyncHandler( async (req, res) => {
    // if(isNaN(req.params.id)){
    //     res.status(400)
    //     throw new Error ("parameter  should be Number")
    // }
    let user = await User.findOne({
        where: {
            id: req.params.id
        },
        attributes:{
            exclude:["password","createdAt","updatedAt"]
        }
    });
    if(user){
         res.status(200).json(user);
    }else{
        res.status(400)
        throw new Error ("Not Found")
    }
});

const registration = asyncHandler(async (req, res) => {

    // console.log(req)
    // console.log(req.File)
    // console.log(req.file)
    // console.log(req.body)

    let {path} = req.file

    const { firstName,lastName, email, password } = req.body;
    if (!firstName|| !lastName || !email || !password ) {
        res.status(400);
        throw new Error("All fields Are Mandatory");
    }

    let email2 = email.toLowerCase();

    const exist = await User.findOne({
        where: {
            email: email2,
        },
    });
    let result  = await uploads(path,"profile")
    if (exist) {
        res.status(400);
        throw new Error("User already registered");
    }
    
    const user = await User.create({
        firstName: firstName,
        lastName:lastName,
        email: email,
        password: password,
        image: result.id,
        createdAt: new Date(),
        updatedAt: new Date(),
    }); 
    
    res.json("ok");
});

const login = asyncHandler(async (req, res) => {
    
    // console.log("body",req.body)
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields Are mandatory");
    }
    let email2 = email.toLowerCase();
   
    let user = await User.findOne({
        where: { email: email2 },
    });

    if(!user){
        res.status(400);
        throw new Error("invalid credential");
    }

    const accesToken= jwt.sign({
        data:{
             id:user.id,
             firstName:user.firstName,
             email:user.email,
             isAdmin:user.isAdmin
        } 
     },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"30m"}
     )

    if (user && (await bcrypt.compare(password, user.password))) {
       
        res.cookie('token',accesToken,{
            httpOnly:true
        })
        const {password,createdAt,updatedAt,...user2} = await user.toJSON()
         res.status(200).json(user2);
    } else {
        res.status(400)
        throw new Error("invalid credential");
    }
});

const currentUser =asyncHandler ( async(req,res)=>{

    const user = await User.findOne({
        where:{id : req.data.id},
        attributes:{exclude:['password','createdAt','updatedAt']}
    })

    res.json(user);
})

const logOut =asyncHandler ( async(req,res)=>{
    // res.cookie('token',"",{maxAge:0})
    // res.clearCookie('token')
    // cookies.set('token', {expires: Date.now()});
    res.cookie('token',"",{
        httpOnly:true,
        maxAge:0,
        
    })

    res.json({message:"success"});
})

const tables =asyncHandler ( async(req,res)=>{

    // const tables = await sequelize.showAllSchemas();
    // res.json(tables);
    const databases = await sequelize.query('SHOW DATABASES', { type: Sequelize.QueryTypes.SHOWDATABASES });
    const databaseNames = databases[0].map(database => database.Database);
    res.json(databaseNames);

})
  

const Image = asyncHandler (async(req,res)=>{
    // console.log(req.query.id)
    const result  = await getImage(req.query.id);
    // console.log(result)
    res.json(result)
})

const getUserDetails = asyncHandler (async (req ,res) => {
    res.json(req.data);
})

module.exports = {
    getUsers,
    getUserById,
    registration,
    login,
    currentUser,
    logOut,
    Image,tables
};
