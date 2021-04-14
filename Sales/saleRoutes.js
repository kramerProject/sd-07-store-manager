const express = require('express');
const saleController = require('./saleControllers');

const router = express.Router();

router.get('/sales', saleController.getAllSales);
router.get('/sales/:id', saleController.getSaleById);
router.post('/sales', saleController.addSale);
router.put('/sales/:id', saleController.uptadeSale);
router.delete('/sales/:id', saleController.deleteSale);

module.exports = router;
