const express = require('express');
const SalesController = require('../controller/salesController');

const {
  saleProductByIdMiddleware,  quantityMiddleware,
} = require('../middlewares/salesMiddleware');

const salesRoute = express.Router();

salesRoute.post('/sales',
  quantityMiddleware,
  saleProductByIdMiddleware,
  SalesController.createSaleController
);

salesRoute.get('/sales', SalesController.getAllSalesController);

module.exports = salesRoute;