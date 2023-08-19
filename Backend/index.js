const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
require('./models');
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
// var z =require("crypto").randomBytes(64).toString("hex");
// console.log(z)
// const bodyParser = require('body-parser');
const app =  express();
// app.use(bodyParser.json());
const userRoutes = require('./routes/user')
const hotelRoutes = require('./routes/hotel')
const bookingRoutes = require('./routes/booking')
const port =process.env.PORT || 4001
const cors=require('cors');


app.use(cors({
    credentials:true ,
    origin:['http://localhost:4000',"http://localhost:4200","http://localhost:5173","http://localhost:5174","https://hotelbooking-330a5.web.app"]
    
}))
app.use(cookieParser());
app.use('/images', express.static('./images'));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use('/user',userRoutes);
app.use('/hotel',hotelRoutes);
app.use('/booking',bookingRoutes)

app.use(errorHandler);
app.listen(port,()=> console.log(`app listening on ${port}`))

