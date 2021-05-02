const express = require('express');
const {
  nameValidator,
  quantityValidator,
} = require('../middlewares/products/validation');
const {
  addProductController,
  getAllProductsController,
} = require('../controller/productsController');

const productsRoute = express.Router();

productsRoute
  .get(
    '/',
    getAllProductsController
  )
  .post(
    '/',
    nameValidator,
    quantityValidator,
    addProductController
  );

module.exports = productsRoute;
