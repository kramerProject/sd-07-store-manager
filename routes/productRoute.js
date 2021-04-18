const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/products', productController.getProducts);

module.exports = router;
