const express = require('express');

const productController = require('./controllers/ProductController');
const productMiddleware = require('./middlewares/ProductMiddleware');

const routes = express.Router();

routes.post('/products',
  productMiddleware.validateLengthName,
  productMiddleware.validateExistsName,
  productMiddleware.validateQuantityIsGreaterZero,
  productMiddleware.validateQuantityNotIsString,
  productController.create);

routes.get('/products',
  productController.findAll);

routes.get('/products/:id',
  productMiddleware.validateExistsId,
  productController.findById);

routes.put('/products/:id',
  productMiddleware.validateLengthName,
  productMiddleware.validateQuantityIsGreaterZero,
  productMiddleware.validateQuantityNotIsString,
  productController.update);

module.exports = routes;
