const express = require('express');
const { productController } = require('../controllers');

const productsRouter = express.Router();

productsRouter.route('/')
  .get(productController.getAll)
  .post(productController.create);

productsRouter.use(productController.errorMiddleware);

module.exports = productsRouter;
