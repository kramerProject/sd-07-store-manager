const express = require('express');
const { saleController } = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

const { valuesSalesMiddleware } = middlewares;

router.post('/sales',
  saleController.createSale);

router.get('/sales',
  saleController.getAllSales);

router.get('/sales/:id',
  valuesSalesMiddleware,
  saleController.getSaleById);

// router.put('/sales/:id', '');

// router.delete('/sales/:id', '');

module.exports = router;