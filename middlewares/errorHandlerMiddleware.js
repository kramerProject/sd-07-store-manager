const { GeneralError } = require('../utils/errorHandler');

const INTERNAL_SERVER_ERROR = 500;

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    const statusResponse = err.getErrorData().code;
    const errorResponse = { err: {
      code: err.getErrorData().codeMessage,
      message: err.message
    } };
    return res.status(statusResponse)
      .json(errorResponse);
  }

  return res.status(INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: err.message
  });
};


module.exports = errorHandlerMiddleware;
