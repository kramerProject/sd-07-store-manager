const express = require('express');

const {
  validNameMiddleware,
  validSizeNameMiddleware,
  validQuantityMiddleware,
  validIdProductMiddleware,
  validProductMiddleware,
} = require('../middlewares');

const {
  findAllProducts,
  findIdProducts,
  addProducts,
  editProducts,
  deleteProducts,
  findAllSale,
  findIdSale,
  addSale,
  editSale,
  deleteSale,
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
  validIdProductMiddleware,
  validQuantityMiddleware,
  deleteProducts);

router.get('/Sales', findAllSale);
router.get('/Sales/:id', findIdSale);
router.post('/Sales', validIdProductMiddleware, validProductMiddleware, addSale);
router.put('/Sales/:id', validQuantityMiddleware, editSale);
router.delete('/Sales:id', deleteSale);

module.exports = { router };
