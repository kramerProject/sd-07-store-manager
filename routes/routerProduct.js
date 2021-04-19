const express = require('express');

const {
  validNameMiddleware,
  validSizeNameMiddleware,
  validQuantityMiddleware,
  validIdProductMiddleware,
} = require('../middlewares');

const {
  findAllProducts,
  findIdProducts,
  addProducts,
  editProducts,
  deleteProducts,
} = require('../controllers');

const router = express.Router();

router.get('/products', findAllProducts);
router.get('/products/:id', findIdProducts);
router.post(
  '/products',
  validNameMiddleware,
  validSizeNameMiddleware,
  validQuantityMiddleware,
  addProducts,
);
router.put(
  '/products/:id',
  validSizeNameMiddleware,
  validQuantityMiddleware,
  editProducts
);

router.delete(
  '/products:id',
  validIdProductMiddleware,
  validQuantityMiddleware, 
  deleteProducts
);

module.exports = { router };
