const express = require('express');
const Products = require('../controllers/productsController');

const router = express.Router();

router.post('/products', Products.createProducts);

module.exports = router;