const express = require('express');
const productsController = require('../controllers/ProductsController');
const router = express.Router();

router.route('/products/:id')
  .get(productsController.getProductsById)
  .put(productsController.updateProductsById)
  .delete(productsController.deleteProductsById);

router.route('/products')
  .post(productsController.createProduct)
  .get(productsController.getProduct);
  
module.exports = router;