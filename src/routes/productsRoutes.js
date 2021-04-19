const express = require('express');
const { postNewProduct } = require('../controller/productsController');

const router = express.Router();

router.post('/products', postNewProduct);

module.exports = router;
