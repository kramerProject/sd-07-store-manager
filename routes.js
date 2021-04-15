const express = require('express');

const {
  getAllProductsController,
  getProductByIdController,
  createProductController
} = require('./controllers/productController');

const { 
  validateNameMiddleware,
  validateQuantityMiddleware,
  validateUniqueProductsMiddleware
} = require('./middlewares/productMiddlewares');

const route = express.Router();

route.get('/products', getAllProductsController);
route.get('/products/:id', getProductByIdController);

route.post('/products',
  validateNameMiddleware,
  validateQuantityMiddleware,
  validateUniqueProductsMiddleware,
  createProductController
);

module.exports = route;
