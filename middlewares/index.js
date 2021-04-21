const errorMiddlewares = require('./error');
const tokenName = require('./tokenName');
const tokenQuantity = require('./tokenQuantity');
const tokenSales = require('./tokenSales');
const tokenExists = require('./tokenExists');
const tokenId = require('./tokenId');
const tokenIsvalid = require('./tokenIsvalid');
const tokenNotFound = require('./tokenNotFound');
const tokenDelete = require('./tokenDelete');

module.exports = {
  errorMiddlewares,
  tokenName,
  tokenQuantity,
  tokenSales,
  tokenExists,
  tokenId,
  tokenIsvalid,
  tokenNotFound,
  tokenDelete,
};
