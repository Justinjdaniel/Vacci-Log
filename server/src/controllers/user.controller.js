import httpStatus from 'http-status';
import { userService } from '../services/index.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
const { CREATED, NOT_FOUND } = httpStatus;

export const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(CREATED).send(user);
});

export const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(NOT_FOUND, 'User not found');
  }
  res.send(user);
});

export const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(NOT_FOUND, 'User not found');
  }
  //TODO: write condition to check the password and return token and user details
  res.send(user);
});
