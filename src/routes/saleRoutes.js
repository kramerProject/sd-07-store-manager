const express = require('express');
const { saleController } = require('../controllers');
// const middlewares = require('../middlewares');

const router = express.Router();

// const { } = middlewares;

router.post('/sales',
  saleController.createSale);

router.get('/sales',
  saleController.getAllSales);

router.get('/sales/:id',
  saleController.getSaleById);

router.delete('/sales/:id',
  saleController.deleteSale);

// router.put('/sales/:id', '');


module.exports = router;