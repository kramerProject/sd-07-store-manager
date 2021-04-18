// adaptação de idéia de tratamento de erros comentada nesse artigo: https://codeburst.io/better-error-handling-in-express-js-b118fc29e9c7

class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getErrorData() {
    const UNPROCESSABLE ={ code: 422, codeMessage: 'invalid_data' };
    const NOT_FOUND = { code: 404, codeMessage: 'not_found' };
    const STOCK_PROBLEM = { code: 404, codeMessage: 'stock_problem' };
    if (this instanceof UnprocessableException) {
      return UNPROCESSABLE;
    }
    if (this instanceof NotFound) {
      return NOT_FOUND;
    }
    if (this instanceof StockProblem) {
      return STOCK_PROBLEM;
    }
    return;
  }
}

class UnprocessableException extends GeneralError {}
class NotFound extends GeneralError {}
class StockProblem extends GeneralError {}

module.exports = {
  GeneralError,
  UnprocessableException,
  NotFound,
  StockProblem
};
