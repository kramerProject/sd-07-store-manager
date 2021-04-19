const { errorMiddleware } = require('./errorMiddleware');
const { validSizeNameMiddleware } = require('./validSizeNameMiddleware');
const { validNameMiddleware } = require('./validNameMiddleware');
const { validIdProductMiddleware } = require('./validIdProductMiddleware');
const { validProductMiddleware } = require('./validProductMiddleware');
const { validQuantityMiddleware } = require('./validQuantityMiddleware');


module.exports = {
  errorMiddleware,
  validNameMiddleware,
  validIdProductMiddleware,
  validProductMiddleware,
  validSizeNameMiddleware,
  validQuantityMiddleware,
};
