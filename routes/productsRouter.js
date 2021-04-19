const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductsById,
  updateProduct } = require('../controllers/productsControllers');
const router = express.Router();

router.route('/products')
  .post(createProduct)
  .get(getAllProducts);

router.route('/products/:id')
  .get(getProductsById)
  .put(updateProduct);

module.exports = router;