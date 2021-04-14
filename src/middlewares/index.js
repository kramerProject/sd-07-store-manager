const errorMiddleware = require('./errorMiddleware');
const logMiddleware = require('./logMiddleware');
const nameValidationsMiddleware = require('./nameValidationsMiddleware');
const quantityValidationsMiddleware = require('./quantityValidationsMiddleware');

module.exports = {
  errorMiddleware,
  logMiddleware,
  nameValidationsMiddleware,
  quantityValidationsMiddleware,
};