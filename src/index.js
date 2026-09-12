import mongoose from "mongoose";
import "dotenv/config";
import express from "express";
import connectDB from "./db/index.js"
import app from "./app.js"
// dotenv.config({
//     path: './env'
// })


(async () => {
    try{
        await connectDB();
        app.on("error", (err) => {
            console.log("Error: ", err);
            throw err;
        });

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
    catch(error){
        console.error("Error:", error);
        throw error;
    }
})()









// const app = express();
// //Remainder: When connecting to MongoDB, alway to asyn await (bcz is it take time) and try & catch (for error handling)
// //We are using IIFE function.
// (async () => {
//     try{
//         await mongoose.connect(`${process.env.MONOGODB_URI}/${DB_NAME}`)
//         app.on("error", (err) => {
//             console.log("Error: ", err);
//             throw err;
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         }
//     }
//     catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         throw error;
//     }
// })()