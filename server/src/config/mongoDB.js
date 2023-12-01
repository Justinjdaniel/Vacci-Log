import mongoose from 'mongoose';
import { mongooseConfig } from './config.js';

const { connect, connection, set } = mongoose;

set('strictQuery', false);

/**
 * Connects to MongoDB database using Mongoose.
 * @param {string} url - MongoDB connection URL.
 * @returns {Promise<mongoose.Connection>} - Mongoose connection object.
 */
// eslint-disable-next-line consistent-return
const connectDB = async () => {
  try {
    await connect(mongooseConfig.url, { maxPoolSize: 10 });
    console.info(
      `\x1b[4m\u001b[46;1m MongoDB Connected:\u001b[44;1m ${connection.name} DB \u001b[0m`
    );

    return connection;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// listen for termination signals and close the connection gracefully
process.on('SIGINT', () => {
  // check if the connection is ready
  if (mongoose.connection.readyState === 1) {
    mongoose.connection.close(() => {
      console.info('Mongoose connection disconnected due to app termination');
      process.exit(0);
    });
  }
});

process.on('SIGTERM', () => {
  // check if the connection is ready
  if (mongoose.connection.readyState === 1) {
    mongoose.connection.close(() => {
      console.info('Mongoose connection disconnected due to app termination');
      process.exit(0);
    });
  }
});

export default connectDB;
