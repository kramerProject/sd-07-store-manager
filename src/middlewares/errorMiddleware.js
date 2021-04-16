const { clientErrCodes, serverErrCodes } = require('../controller/statusCodes');

const errorMiddleware = (error, _req, res, _next) => {
  const { err, message, status } = error;
  return res.status( error.clientErr
    ? clientErrCodes[`${status}`]
    : serverErrCodes[`${status}`] )
    .json({ err: { message, code: err } });
};


module.exports = { errorMiddleware };
