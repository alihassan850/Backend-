import { v2 as cloudinary } from "cloudinary"
import fs from "fs" // file System (node.js packet to handle file sytem for upload, delete, update, read etc)

//configuration
cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_CLOUD_API, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });


// Upload an image
const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return console.log("Cannot file File Path !!")

    const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type : "auto"
    })

    //File have been Upload Successfully
    console.log("Files is Upload Successfully", response.url)
   return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)  //remove the local saved temporary file as the upload operation got failed
        return null;
    }
}

export { uploadOnCloudinary }