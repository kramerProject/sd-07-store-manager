const productPostMiddleware = require('./productPostMiddleware');
const errorMiddleware = require('./errorMiddleware');
const productExistMiddleware = require('./productExistMiddleware');
const productUpdateMiddleware = require('./productUpdateMiddleware');
const salePostMiddleware = require('./salePostMiddleware');
const saleExistMiddleware = require('./saleExistMiddleware');
const saleIdExistMiddleware = require('./saleIdExistMiddleware');

module.exports = {
  productUpdateMiddleware,
  productPostMiddleware,
  productExistMiddleware,
  errorMiddleware,
  salePostMiddleware,
  saleExistMiddleware,
  saleIdExistMiddleware,
};
