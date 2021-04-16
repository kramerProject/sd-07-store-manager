const express = require('express');
const { createProduct } = require('../controllers/productsControllers');
const router = express.Router();

router.route('/products')
  .post(createProduct);

module.exports = router;