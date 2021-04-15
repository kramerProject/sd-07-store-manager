const express = require('express');
const productsController = require('../controllers/productsController');
const router = express.Router();
router.route('/products')
  .post(productsController.createProduct)
  // .get(productsController.getProduct);

// router.route('/products/:id')
//   .get(productsController.findProductById)
//   .put(productsController.updateProducts)
//   .delete(productsController.deleteProducts);

module.exports = router;