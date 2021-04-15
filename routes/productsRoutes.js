const express = require('express');
const products = require('../controllers/productController');

const router = express.Router();

router.post('/products', products.createProduct);
router.get('/products', products.getAll);
router.get('/products/:id', products.getById);

module.exports = router;
