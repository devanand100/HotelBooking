const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const db = require("../models");
const User = db.User;
const validateUser = asyncHandler( async(req,res,next)=>{

    let token;
    let decoded ;
    // let header = req.headers.authorization || req.headers.Authorization
    let cookie = req.cookies['token']
    if(cookie)
    {  
        try{
            // token = header.split(" ")[1];
            decoded = jwt.verify(cookie,process.env.ACCESS_TOKEN_SECRET)
                // console.log(decoded)
            const user = await User.findOne({
                where:{
                    id : decoded.data.id 
                },
                attributes:['id','firstName','email',"isAdmin"]
            })
            req.data =  user
            next();
        }catch(exception){
            console.log(exception)  
            res.status(401)
            throw new Error("User is not Authorized")
        }
    }else{
        res.status(401)
         throw new Error("cookie or token is missing")
    }

})

module.exports = validateUser