const express = require('express');

const router = express.Router();

const {
  getAllSales,
  getSaleId,
  postSale,
  putSale,
  deleteSale } = require('../controllers/sales');

router.get('/', getAllSales);

router.get('/:id', getSaleId);

router.post('/', postSale);

router.put('/:id', putSale);

router.delete('/:id', deleteSale);

module.exports = router;