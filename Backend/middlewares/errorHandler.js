
const errorHandler = (err,req,res,next) =>{
    console.log("error Handel middleWare")
    
    const errstatus = res.statusCode || 500;
    const errmsg = err.message || "somthing went wrong"
    console.log("///////////////////////////////")
    console.log( err.stack)
    console.log("///////////////////////////////")
    console.log(err)
   
// console.log( "message",errmsg,
//     "statusCode",errstatus,
//     "stack",err.stack)
    res.status(errstatus).json({
        message:errmsg,
        statusCode:errstatus,
        stack:  err.stack
    })
}
module.exports = errorHandler