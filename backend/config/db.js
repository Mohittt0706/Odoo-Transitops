const mongoose = require('mongoose');
const { DATABASE_URL } = require('./env');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DATABASE_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.error('Server will continue without database connection');
  }
};

module.exports = connectDB;
