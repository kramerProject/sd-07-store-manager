const express = require('express');
// const ProductsModel = require('../models/productsModel');
const ProductsController = require('../controller/productsController');

const {
  nameMiddleware,
  quantityMiddleware,
  productByIdMiddleware,
} = require('../middlewares/productsMiddleware');

const productsRoute = express.Router();

productsRoute.post(
  '/products',
  nameMiddleware,
  quantityMiddleware,
  ProductsController.createProductController
);

productsRoute.get('/products', ProductsController.getAllProductsController);

productsRoute.get('/products/:id',
  productByIdMiddleware,
  ProductsController.productByIdController
);

productsRoute.put('/products/:id',
  quantityMiddleware,
  nameMiddleware,
  ProductsController.updateProductController
);

module.exports = productsRoute;
