const express = require('express');
const router = express.Router();
const products = require('../controllers/productController');
const middlewares = require('../middlewares');

router.post(
  '/',
  middlewares.productNameMid,
  middlewares.productQuantityMid,
  products.createProduct,
);

router.get('/:id', products.getById);
router.get('/', products.getAll);
router.put(
  '/:id',
  middlewares.productNameMid,
  middlewares.productQuantityMid,
  products.updateProduct,
);

router.delete('/:id', products.deleteProduct);

module.exports = router;
