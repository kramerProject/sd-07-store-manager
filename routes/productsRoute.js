const express = require('express');
const productsController = require('../controllers/productsController');
const { newProductMiddleware } = require('../middleware');

const router = express.Router();

router.get('/products', productsController.getAllProducts)
  .post('/products', newProductMiddleware, productsController.createProduct);

module.exports = router;
