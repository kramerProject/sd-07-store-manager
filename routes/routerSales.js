const express = require('express');

const router = express.Router();

const { 
  findAllSale,
  findIdSale,
  addSale,
  editSale,
  deleteSale
} = require('../controllers');

const {
  validQuantityMiddleware,
  validIdProductMiddleware,
  validProductMiddleware,
} = require('../middlewares');

router.get('/Sales', findAllSale);
router.get('/Sales/:id', findIdSale);
router.post('/Sales',validIdProductMiddleware, validProductMiddleware, addSale);
router.put('/Sales/:id', validQuantityMiddleware, editSale);
router.delete('/Sales:id', deleteSale);

module.exports = { routerSales } ;
