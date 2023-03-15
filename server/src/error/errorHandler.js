// throwing error
export const errorGenerator = (req, res, next) => {
  const error = new Error('404 Resource not found');
  error.status = 404;
  next(error);
};

// error handler
export const errorHandler = (error, req, res, next) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({
    message: 'something went wrong...',
  });
};

// app.use((req, res, next) => {
//   res
//     .status(404)
//     .json({ message: "We couldn't find what you were looking for 😞" });
// });

// app.use( (err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).json(err);
// });
