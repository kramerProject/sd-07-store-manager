const express = require('express');

const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controller/productsController');

const router = express.Router();

router
  .route('/products')
  .get(getAllProducts)
  .post(addProduct);

router
  .route('/products/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);


module.exports = router;