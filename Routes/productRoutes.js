const express = require('express');
const productController = require('../Controllers/productController');

const router = express.Router();

router.post('/products', productController.addProduct);
router.get('/products', productController.getAllProduct);
router.get('/products/:id', productController.getForId);

module.exports = router;