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

const route = express.Router();

route.get('/Sales', findAllSale);
route.get('/Sales/:id', findIdSale);
route.post('/Sales',validIdProductMiddleware, validProductMiddleware, addSale);
route.put('/Sales/:id', validQuantityMiddleware, editSale);
route.delete('/Sales:id', deleteSale);

module.exports = { route } ;
