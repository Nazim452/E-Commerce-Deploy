import mongoose from "mongoose";
import colors from 'colors';

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        //console.log("Database connection successfully".bgMagenta.white);

        
    } catch (error) {
        //console.log("Error While Connecting Database",error);
        
    }
}

export default connectDB;











