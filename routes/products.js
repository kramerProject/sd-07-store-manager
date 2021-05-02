const express = require('express');
const {
  nameValidator,
  quantityValidator,
} = require('../middlewares/products/validation');
const {
  addProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
} = require('../controller/productsController');

const productsRoute = express.Router();

productsRoute
  .post(
    '/',
    nameValidator,
    quantityValidator,
    addProductController
  )
  .get(
    '/',
    getAllProductsController
  )
  .get(
    '/:id',
    getProductByIdController,
  )
  .put(
    '/:id',
    quantityValidator,
    nameValidator,
    updateProductController,
  );

module.exports = productsRoute;
