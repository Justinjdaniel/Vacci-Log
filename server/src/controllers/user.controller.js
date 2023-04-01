import httpStatus from 'http-status';
import { userService } from '../services/index.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

const { CREATED, NOT_FOUND, UNAUTHORIZED } = httpStatus;

/**
 * Create a new user
 * @param {Object} req - The request object
 * @param {Object} req.body - The request body
 * @param {string} req.body.email - The email of the user
 * @param {string} req.body.password - The password of the user
 * @returns {Object} The created user object
 */
export const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(CREATED).json({ data: user });
});

/**
 * Get a user by ID
 * @param {Object} req - The request object
 * @param {string} req.params.userId - The ID of the user to get
 * @returns {Object} The user object
 * @throws {ApiError} If the user is not found
 */
export const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(NOT_FOUND, 'User not found');
  }
  res.json({ data: user });
});

/**
 * Login a user
 * @param {Object} req - The request object
 * @param {Object} req.body - The request body
 * @param {string} req.body.email - The email of the user to login
 * @param {string} req.body.password - The password of the user to login
 * @returns {Object} An object containing a token and the logged in user's details
 * @throws {ApiError} If the user is not found or if the password is incorrect
 */
export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(NOT_FOUND, 'User not found');
  }
  if (password !== user.password) {
    throw new ApiError(UNAUTHORIZED, 'Incorrect password');
  }

  const payload = user.id;
  const token = generateToken(payload);
  res.json({ data: { token, user } });
});
