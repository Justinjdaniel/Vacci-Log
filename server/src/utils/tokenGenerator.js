import jsonwebtoken from 'jsonwebtoken';
import { jwt } from '../config/config';

const { secret } = jwt;

/**
 * Generate a JWT token
 * @param {Object} payload - The payload to include in the token
 * @param {Object} [options]  - The options to use when generating the token
 * @returns {string} The generated JWT token
 */
const generateToken = (payload, options = {}) => {
  const token = jsonwebtoken.sign(payload, secret, options);
  return token;
};

export default generateToken;
