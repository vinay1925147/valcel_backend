import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer'
cloudinary.config({
        cloud_name: 'dfp8qiswq', 
        api_key : process.env.CLOUDE_API_KEY, 
        api_secret: process.env.CLOUDE_API__SECRET,
})
const storage =multer.memoryStorage();

export const ImageUpload = async (file)=>{
    const result = await cloudinary.uploader.upload(file,{
        resource_type:'auto'
    })
    return result ;
}
 export const upload = multer({storage});