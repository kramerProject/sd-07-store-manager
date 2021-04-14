const express = require('express');
const rescue = require('express-rescue');

const productController = require('./productController');
const productValidateMiddleware = require('./productValidateMiddleware');

const router = express.Router();

router.post('/products', productValidateMiddleware, rescue(productController.addProduct));
//router.get('/product', () => true);
// router.get('/product/:id', productController.getProductById);
// router.put('/product/:id', productController.updateProduct);
// router.delete('/product/:id', productController.deleteProduct);

module.exports = router; 
