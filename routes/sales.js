const express = require('express');
const SalesController = require('../controller/salesController');

const {
  nameMiddleware,
  quantityMiddleware,
} = require('../middlewares/productsMiddleware');

const salesRoute = express.Router();

salesRoute.post(
  '/sales',
  quantityMiddleware,
  nameMiddleware,
  SalesController.createSaleController,
);

module.export = salesRoute;