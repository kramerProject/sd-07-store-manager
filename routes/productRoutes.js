const express = require('express');
const { productController } = require('../controllers');
const { nameValidationMiddleware, quantityValidationMiddleware,
  idValidationMiddleware } =
require('../middlewares');

const productRouter = express.Router();

// requisito 1- add produto
productRouter.post('/products',nameValidationMiddleware,
  quantityValidationMiddleware, productController.addProduct);

//requisito 2- get /products /products/:id
productRouter.get('/products', productController.getAllProducts);
productRouter.get('/products/:id', idValidationMiddleware,
  productController.getPoductById);


module.exports = productRouter;
