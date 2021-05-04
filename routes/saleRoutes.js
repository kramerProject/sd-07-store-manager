const express = require('express');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.get('/sales', saleController.getAllSales);
router.get('/sales/:id', saleController.getSaleById);
router.post('/sales', saleController.newSale);
router.put('/sales/:id', saleController.editSaleById);
router.delete('/sales/:id', saleController.deleteSaleById);

module.exports = router;