const express = require('express');
const { saleController } = require('../controllers');
const { saleValidationMiddleware } = require('../middlewares');

const salesRouter = express.Router();

salesRouter.post('/sales', saleValidationMiddleware, saleController.addSale);

salesRouter.get('/sales', saleController.getAllSales);
salesRouter.get('/sales/:id', saleController.getSaleById);
module.exports = salesRouter;
