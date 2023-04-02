// Define a helper function that returns a JSON response with a status code and a message
export const sendResponse = (res, status, message, data) => {
  res.status(status).json({
    status,
    message,
    ...data,
  });
};

// Define a helper function that returns a JSON response with an error code and a message
export const sendError = (res, status, message, error) => {
  res.status(status).json({
    status: 'error',
    message,
    error,
  });
};
