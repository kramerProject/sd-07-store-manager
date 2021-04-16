const express = require('express');

const {
  getAllProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController
} = require('./controllers/productController');

const {
  getAllSalessController,
  getSaleByIdController,
  createSaleController
} = require('./controllers/saleController');

const { 
  validateNameMiddleware,
  validateQuantityMiddleware,
  validateUniqueProductsMiddleware
} = require('./middlewares/productMiddlewares');

const { 
  validateSaleMiddleware
} = require('./middlewares/salesMiddlewares');


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

route.get('/sales', getAllSalessController);

route.get('/sales/:id', getSaleByIdController);

route.post('/sales', validateSaleMiddleware, createSaleController);

module.exports = route;
