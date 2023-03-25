import httpStatus from 'http-status';
import { verify } from 'jsonwebtoken';
import { userService } from '../services';
import ApiError from '../utils/ApiError.js';

/**
 * Middleware to authenticate user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @throws {ApiError} - If authentication fails
 */
const authenticateUser = async (req, res, next) => {
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      // Get token from header
      const token = req.headers.authorization?.split(' ')[1];
      if (!token)
        throw new ApiError(httpStatus[401], 'Not authorized, no token');

      // Verify token
      const decoded = verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await userService.getUserById(decoded.id).select('-password');

      if (req.user === null)
        throw new ApiError(httpStatus[404], 'User not found');

      next();
    } catch (error) {
      console.error(error);
      throw new ApiError(httpStatus[401], 'Not authorized');
    }
  }
};

export default { authenticateUser };