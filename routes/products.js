const express = require('express');
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

productsRoute.delete('/products/:id',
  ProductsController.deleteProductController
);

module.exports = productsRoute;
