mongoose = require('mongoose');
dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const mongoURI = `${process.env.MONGO_URI}`;
        console.log('Connecting to MongoDB with URI:');
        await mongoose.connect(mongoURI);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};

module.exports = connectDB;
