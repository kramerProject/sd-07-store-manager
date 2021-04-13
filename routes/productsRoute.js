const express = require('express');

const {
  addProduct
} = require('../controller/productsController');

const router = express.Router();

router.post('/products', addProduct);

module.exports = router;