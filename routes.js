const express = require('express');

const {
  getAllProductsController,
  createProductController 
} = require('./controllers/productController');

const { 
  validateNameMiddleware,
  validateQuantityMiddleware,
  validateUniqueProductsMiddleware
} = require('./middlewares/productMiddlewares');

const route = express.Router();

route.get('/products', getAllProductsController);

route.post('/products',
  validateNameMiddleware,
  validateQuantityMiddleware,
  validateUniqueProductsMiddleware,
  createProductController
);

module.exports = route;
