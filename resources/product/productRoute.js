const express = require('express');
const rescue = require('express-rescue');

const productController = require('./productController');
const productValidateMiddleware = require('./productValidateMiddleware');

const router = express.Router();

router.post('/products', productValidateMiddleware, rescue(productController.addProduct));
router.get('/products', rescue(productController.getAllProducts));
router.get('/products/:id', rescue(productController.getProductById));
router.put('/products/:id', 
  productValidateMiddleware, 
  rescue(productController.updateProduct));
// router.delete('/products/:id', productController.deleteProduct);

module.exports = router; 
