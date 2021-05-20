const express = require('express');
const salesController = require('../controller/salesController');

const {
  saleProductByIdMiddleware,  quantityMiddleware,
} = require('../middlewares/salesMiddleware');

const salesRoute = express.Router();

salesRoute.post('/sales',
  // saleProductByIdMiddleware,
  quantityMiddleware,
  salesController.createSaleController
);

salesRoute.get('/sales',
  // saleProductByIdMiddleware,
  salesController.getAllSalesController
);

salesRoute.get('/sales/:id',
  // saleProductByIdMiddleware,
  salesController.salesByIdController,
);

salesRoute.put('/sales/:id',
  // saleProductByIdMiddleware,
  quantityMiddleware,
  salesController.updateSaleController,
);

salesRoute.delete('/sales/:id',
  salesController.deleteSaleController,
);

module.exports = salesRoute;