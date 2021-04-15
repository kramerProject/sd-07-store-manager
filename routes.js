const express = require('express');

const {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController
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

route.put('/products/:id',
  validateNameMiddleware,
  validateQuantityMiddleware,
  updateProductController
);

route.delete('/products/:id', deleteProductController);

module.exports = route;
