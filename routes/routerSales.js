const express = require('express');
const router = express.Router();
const { 
  findAllSale, 
  findIdSale, 
  addSale, 
  editSale, 
  deleteSale } = require('../controllers');

router.get('/Sales', findAllSale);
router.get('/Sales/:id', findIdSale);
router.post('/Sales', addSale);
router.put('/Sales/:id', editSale);
router.delete('/Sales:id', deleteSale);


module.exports = routerSales;
