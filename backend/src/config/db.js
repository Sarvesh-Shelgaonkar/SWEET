const mongoose = require('mongoose');

const connectDB = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    if(!MONGO_URI) throw new Error('MONGO_URI is not defined in environment variables');
    try
    {
        await mongoose.connect(MONGO_URI);
        console.log('🎉 MongoDB connected successfully!');
    }
    catch (err)
    {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;