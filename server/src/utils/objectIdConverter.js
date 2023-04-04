import mongoose from 'mongoose';

/**
 * Converts an integer to an ObjectId.
 * @param {number} value - The integer value to convert.
 * @returns {mongoose.Types.ObjectId} The converted ObjectId.
 */
export const intToObjectId = (value) => {
  // Convert the integer to a hexadecimal string
  let hex = value.toString(16);

  // Pad the string with zeros to make it 24 characters long
  hex = hex.padStart(24, '0');

  // Create an ObjectId from the string
  let objectId = new mongoose.Types.ObjectId(hex);

  // Return the ObjectId
  return objectId;
};

/**
 * Converts an ObjectId to an integer.
 * @param {mongoose.Types.ObjectId} objectId - The ObjectId to convert.
 * @returns {number} The converted integer value.
 */
export const objectIdToInt = (objectId) => {
  // Convert the ObjectId to a hexadecimal string
  let hex = objectId.toString();

  // Take the last 8 characters of the string
  hex = hex.slice(-8);

  // Convert the hexadecimal string to an integer
  let value = parseInt(hex, 16);

  // Return the integer
  return value;
};
