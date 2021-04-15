const UNPROCESSABLE = 404;

// const productMiddleware = (err, req, res, _next) => {
//   res.status(UNPROCESSABLE).json({
//     message: err.message,
//   });
// };

const productMiddleware = (err, req, res, _next) => {
  res.status(UNPROCESSABLE).json(err.message);
};

module.exports = {
  productMiddleware,
};

