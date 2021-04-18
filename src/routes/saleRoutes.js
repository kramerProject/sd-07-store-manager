const express = require('express');
const { saleController } = require('../controllers');
// const middlewares = require('../middlewares');

const router = express.Router();

// const { } = middlewares;

router.get('/sales',
  saleController.getAllSales);

router.post('/sales',
  saleController.createSale);

// router.get('/sales/:id', '');

// router.put('/sales/:id', '');

// router.delete('/sales/:id', '');

module.exports = router;