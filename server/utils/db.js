import mongoose from 'mongoose';

const connectDB = async (uri) => {
    try {
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        throw error;
        process.exit(1);
    }
};

export default connectDB;
