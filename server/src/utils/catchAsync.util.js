/**
 * Wraps an async function and catches any errors that occur.
 * @param {Function} fn - The async function to wrap.
 * @returns {Function} A new function that catches errors.
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default catchAsync;
