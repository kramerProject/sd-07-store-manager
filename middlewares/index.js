const { errorMiddleware } = require('./errorMiddleware');
const { validSizeNameMiddleware } = require('./validSizeNameMiddleware');
const { validNameMiddleware } = require('./validNameMiddleware');
const { validSaleMiddleware } = require('./validSaleMiddleware');
const { validProductMiddleware } = require('./validProductMiddleware');
const { validQuantityMiddleware } = require('./validQuantityMiddleware');


module.exports = {
  errorMiddleware,
  validNameMiddleware,
  validSaleMiddleware,
  validProductMiddleware,
  validSizeNameMiddleware,
  validQuantityMiddleware,
};
