const express = require('express');
const { saleController } = require('../controllers');
const { saleValidationMiddleware } = require('../middlewares');

const salesRouter = express.Router();

salesRouter.post('/sales', saleValidationMiddleware, saleController.addSale);

salesRouter.get('/sales', saleController.getAllSales);
salesRouter.get('/sales/:id', saleController.getSaleById);
salesRouter.put('/sales/:id', saleValidationMiddleware, saleController.updateSale);

salesRouter.delete('/sales/:id', saleController.deleteSale);

module.exports = salesRouter;
