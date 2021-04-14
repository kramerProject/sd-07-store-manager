// adaptação de idéia de tratamento de erros comentada nesse artigo: https://codeburst.io/better-error-handling-in-express-js-b118fc29e9c7

class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getErrorData() {
    const UNPROCESSABLE ={ code: 422, codeMessage: 'invalid_data' };
    const NOT_FOUND = { code: 404, codeMessage: 'not_found' };
    if (this instanceof UnprocessableException) {
      return UNPROCESSABLE;
    }
    if (this instanceof NotFound) {
      return NOT_FOUND;
    }
    return;
  }
}

class UnprocessableException extends GeneralError {}
class NotFound extends GeneralError {}

module.exports = {
  GeneralError,
  UnprocessableException,
  NotFound,
};
