const express = require('express');
const { productController } = require('../controllers');
const { nameValidationMiddleware, quantityValidationMiddleware } =
require('../middlewares');

const productRouter = express.Router();

// requisito 1- add produto
productRouter.post('/products',nameValidationMiddleware,
  quantityValidationMiddleware, productController.addProduct);

//requisito 2- get /products /products/:id


// vou fazer middlewares de erro?
// productRouter.use(middlewares.errorMiddleware);
module.exports = productRouter;
