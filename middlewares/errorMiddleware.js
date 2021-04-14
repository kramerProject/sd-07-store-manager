const SERVER_ERROR = 500;

const errorMiddleware = (err, req, res, next) {
 return res.status(SERVER_ERROR).send({ message: err.message });
};

module.exports = { errorMiddleware }
