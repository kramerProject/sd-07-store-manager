const express = require('express');
const products = require('../controllers/productController');

const router = express.Router();

router.post('/products', products.createProduct);

module.exports = router;
