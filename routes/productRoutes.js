const express = require('express');
const productController = require('../controllers/productController');
const middlewares = require('../middlewares');

const router = express.Router();

router.get('/products', productController.getAll);
router.get('/products/:id', productController.getById);
router.post(
  '/products',
  middlewares.validateProduct,
  productController.createProduct
);
router.put(
  '/products/:id',
  middlewares.validateProduct,
  productController.updateProduct
);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
