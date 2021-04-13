const express = require('express');

const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} = require('../controller/productsController');

const router = express.Router();

router
  .route('/products')
  .get(getAllProducts)
  .post(addProduct);

router
  .route('/products/:id')
  .get(getProductById)
  .put(updateProduct);


module.exports = router;