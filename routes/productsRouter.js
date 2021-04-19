const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
  deleteProductById } = require('../controllers/productsControllers');
const router = express.Router();

router.route('/products')
  .post(createProduct)
  .get(getAllProducts);

router.route('/products/:id')
  .get(getProductsById)
  .put(updateProduct)
  .delete(deleteProductById);

module.exports = router;