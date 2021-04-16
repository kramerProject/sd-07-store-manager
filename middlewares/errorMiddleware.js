const UNPROCESSABLE = 422;

// const productMiddleware = (err, req, res, _next) => {
//   res.status(UNPROCESSABLE).json({
//     message: err.message,
//   });
// };

const productMiddleware = (err, req, res, _next) => {
  res.status(UNPROCESSABLE).json(JSON.parse(err.message));
};

module.exports = {
  productMiddleware,
};

