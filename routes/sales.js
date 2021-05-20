const express = require('express');
const salesController = require('../controller/salesController');

const {
  saleProductByIdMiddleware,  quantityMiddleware,
} = require('../middlewares/salesMiddleware');

const salesRoute = express.Router();

salesRoute.post('/sales',
  saleProductByIdMiddleware,
  quantityMiddleware,
  salesController.createSaleController
);

salesRoute.get('/sales', salesController.getAllSalesController);

// salesRoute.get('/sales/:id',
// SalesController.salesByIdController,
// );

module.exports = salesRoute;