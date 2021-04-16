const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductsById } = require('../controllers/productsControllers');
const router = express.Router();

router.route('/products')
  .post(createProduct)
  .get(getAllProducts);

router.route('/products/:id')
  .get(getProductsById);

module.exports = router;