/**
 * Throws a 404 error with a message of '404 Resource not found'.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export const errorGenerator = (req, res, next) => {
  const error = new Error('404 Resource not found');
  error.status = 404;
  next(error);
};

/**
 * Handles errors by sending an appropriate response to the client.
 * @param {Error} error - The error object.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export const errorHandler = (error, req, res, next) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({
    message: 'something went wrong...',
  });
};
