class ErrorHandler extends Error {
  constructor(statusCode, textCode, message) {
    super();
    this.statusCode = statusCode;
    this.textCode = textCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, textCode, message } = err;
  res.status(statusCode).json({
    'err': {
      code: textCode,
      message,
    }
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
