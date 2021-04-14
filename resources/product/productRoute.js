const express = require('express');
const rescue = require('express-rescue');

const productController = require('./productController');
const productValidateMiddleware = require('./productValidateMiddleware');

const router = express.Router();

const PRODUCTS_PATH = '/products';

router.post(PRODUCTS_PATH,
  productValidateMiddleware,
  rescue(productController.addProduct));
router.get(PRODUCTS_PATH,
  rescue(productController.getAllProducts));
router.get(`${PRODUCTS_PATH}/:id`,
  rescue(productController.getProductById));
router.put(`${PRODUCTS_PATH}/:id`, 
  productValidateMiddleware, 
  rescue(productController.updateProduct));
router.delete(`${PRODUCTS_PATH}/:id`,
  rescue(productController.deleteProduct));

module.exports = router; 
