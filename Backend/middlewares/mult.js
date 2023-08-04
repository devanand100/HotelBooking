const multer = require("multer");

const store = multer.diskStorage({
    destination:"./images",
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}+${file.originalname}`)
    }
})

const upload = multer({
    storage:store,
    fileFilter(req,file,cb){
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a valid image file'),false)
        }
        cb(undefined, true)
    }
})

module.exports = upload;