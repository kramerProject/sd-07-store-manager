function CustomError(message, codeMessage, code) {
  this.message = {
    err:
    {
      'code': codeMessage,
      'message': message
    }
  };
  this.stack = Error().stack;
  this.code = code;
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.name = 'CustomError';

module.exports = CustomError;
