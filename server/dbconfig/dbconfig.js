import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = `${process.env.MONGO_URI}`;
        console.log('Connecting to MongoDB with URI:'); // Log the URI to debug
        await mongoose.connect(mongoURI);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};

export default connectDB; 