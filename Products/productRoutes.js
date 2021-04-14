const express = require('express');
const productController = require('./productControllers');

const router = express.Router();

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.addProduct);

module.exports = router;
