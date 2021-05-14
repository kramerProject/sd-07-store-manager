const express = require('express');
const saleController = require('../controller/saleController');

const router = express.Router();

router.post('/sales', saleController.insertSale);
router.get('/sales', saleController.findAll);
router.get('/sales/:id', saleController.findSaleById);
router.put('/sales/:id', saleController.updateSaleById);
router.delete('/sales/:id', saleController.deleteSale);

module.exports = router;

