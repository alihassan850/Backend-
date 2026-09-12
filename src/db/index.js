import mongoose from "mongoose";
import dns from "dns";
import { DB_NAME } from '../constants.js'

//To resolve the DNS resolution issue, we can set the DNS servers to use Google's public DNS servers 
dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONOGODB_URL}/${DB_NAME}`)
        console.log(`Connected to MongoDB !! DB Host : ${connectionInstance.connection.host} `);
    }
    catch (error) {
        console.error("Error connecting to MongoDB: ", error);
        process.exit(1);
    }
}

export default connectDB;