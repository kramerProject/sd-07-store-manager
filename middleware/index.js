const errorMiddleware = require('./errorMiddleware');
const productMiddleware = require('./productHandler');
const saleMiddleware = require('./salesHandler');

module.exports = { 
  errorMiddleware,
  productMiddleware,
  saleMiddleware
};
