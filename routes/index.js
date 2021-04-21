const express = require('express');

const {
  validNameMiddleware,
  validSizeNameMiddleware,
  validQuantityMiddleware,
  validSaleMiddleware,
  // validProductMiddleware,
} = require('../middlewares');

const {
  findAllProducts,
  findIdProducts,
  addProducts,
  editProducts,
  deleteProducts,
  // findAllSale,
  // findIdSale,
  // addSale,
  // editSale,
  // deleteSale,
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
  editProducts);

router.delete(
  '/products:id',
  validSaleMiddleware,
  validQuantityMiddleware,
  deleteProducts);

// router.get('/sales', findAllSale);
// router.get('/sales/:id', findIdSale);
// router.post('/sales', validSaleMiddleware, validProductMiddleware, addSale);
// router.put('/sales/:id', validQuantityMiddleware, editSale);
// router.delete('/sales:id', deleteSale);

module.exports = router;
