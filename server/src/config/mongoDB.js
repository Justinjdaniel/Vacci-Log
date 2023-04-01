import mongoose from 'mongoose';
import { mongooseConfig } from './config.js';
const { connect, connection, set } = mongoose;

set('strictQuery', false);

/**
 * Connects to MongoDB database using Mongoose.
 * @param {string} url - MongoDB connection URL.
 * @returns {Promise<mongoose.Connection>} - Mongoose connection object.
 */
const connectDB = async () => {
  try {
    await connect(mongooseConfig.url);
    console.log(
      `\x1b[4m\u001b[46;1m MongoDB Connected:\u001b[44;1m ${connection.name} DB \u001b[0m`
    );

    return connection;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
