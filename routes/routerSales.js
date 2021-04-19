const express = require('express');

const {
  validQuantityMiddleware,
  validIdProductMiddleware,
  validProductMiddleware,
} = require('../middlewares');

const { 
  findAllSale,
  findIdSale,
  addSale,
  editSale,
  deleteSale
} = require('../controllers');

const router = express.Router();

router.get('/Sales', findAllSale);
router.get('/Sales/:id', findIdSale);
router.post('/Sales',validIdProductMiddleware, validProductMiddleware, addSale);
router.put('/Sales/:id', validQuantityMiddleware, editSale);
router.delete('/Sales:id', deleteSale);

module.exports = { router } ;
