class CustomError extends Error {
  constructor(status,code, message) {
    super(status, code, message);
    this.status = status;
    this.code = code;
    this.message = message;
    Error.captureStackTrace(this, CustomError);
  }
}

module.exports = CustomError;
