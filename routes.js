const express = require('express');

const productController = require('./controllers/ProductController');
const productMiddleware = require('./middlewares/ProductMiddleware');

const routes = express.Router();

routes.route('/products')
  .post(
    productMiddleware.createValidations,
    productController.create);

module.exports = routes;
