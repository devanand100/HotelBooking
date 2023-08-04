// var cloudinary = require('cloudinary').v2;
// import { v2 as cloudinary } from 'cloudinary'
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv').config()
const fs = require('fs');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

exports.uploads = async (filePath,folder) =>{

    const options = {
        folder:folder,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      }

    try {
        const result = await cloudinary.uploader.upload(filePath,options);
        console.log(result)
        fs.unlinkSync(filePath)
        return {
            message: "Success",
            id:result.public_id,
            url:result.url
        };
      } catch (error) {
        fs.unlinkSync(filePath)
        console.error(error);
       return  { message: "Fail" }
      }

}

exports.getImage = async (pid) => {
    try {
        const result = await cloudinary.url(pid);
        return result;
        } catch (error) {
        console.error(error);
    }
}
// module.exports = uploads