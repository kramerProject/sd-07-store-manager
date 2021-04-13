const express = require('express');

const {
  addProduct,
  getAllProducts,
  getProductById,
} = require('../controller/productsController');

const router = express.Router();

router
  .route('/products')
  .get(getAllProducts)
  .post(addProduct);

router
  .route('/products/:id')
  .get(getProductById);


module.exports = router;