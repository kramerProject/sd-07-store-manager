const express = require('express');
const rescue = require('express-rescue');

const productController = require('./productController');
const productValidateMiddleware = require('./productValidateMiddleware');

const router = express.Router();

router.post('/products', productValidateMiddleware, rescue(productController.addProduct));
router.get('/products', rescue(productController.getAllProducts));
router.get('/products/:id', rescue(productController.getProductById));
// router.put('/product/:id', productController.updateProduct);
// router.delete('/product/:id', productController.deleteProduct);

module.exports = router; 
