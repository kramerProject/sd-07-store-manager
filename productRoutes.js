const express = require('express');
const productController = require('./productControllers');

const router = express.Router();

router.post('/products', productController.addProduct);

module.exports = router;
