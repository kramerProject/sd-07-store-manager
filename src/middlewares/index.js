const errorMiddleware = require('./errorMiddleware');
const logMiddleware = require('./logMiddleware');
const nameValidationsMiddleware = require('./nameValidationsMiddleware');
const quantityValidationsMiddleware = require('./quantityValidationsMiddleware');
const productIdExistisMiddleware = require('./productIdExistisMiddleware');

module.exports = {
  errorMiddleware,
  logMiddleware,
  nameValidationsMiddleware,
  quantityValidationsMiddleware,
  productIdExistisMiddleware,
};