const express = require('express');
const { productController } = require('../controllers');

const productsRouter = express.Router();

productsRouter.route('/')
  .get(productController.getAll)
  .post(productController.create);

productsRouter.route('/:id')
  .get(productController.getById);

productsRouter.use(productController.errorMiddleware);

module.exports = productsRouter;
