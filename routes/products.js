const express = require('express');
const {
  nameValidator,
  quantityValidator,
} = require('../middlewares/products/validations');
const {
  addProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} = require('../controllers/productsController');

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
  )
  .delete(
    '/:id',
    deleteProductController,
  );

module.exports = productsRoute;
