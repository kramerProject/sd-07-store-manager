const express = require('express');
const SalesController = require('../Controllers/SalesController');
const middlewares = require('../Middlewares/middlewares');
const router = express.Router();

router.get('/sales', SalesController.getAllSales);
router.get('/sales/:id', SalesController.getSaleById);
router.delete('/sales/:id', SalesController.deleteSaleById);

router.post(
  '/sales',
  middlewares.SaleProductAmountMiddleware,
  SalesController.addNewSale
);
router.put(
  '/sales/:id',
  middlewares.SaleProductAmountMiddleware,
  SalesController.updateSaleById
);

module.exports = router;