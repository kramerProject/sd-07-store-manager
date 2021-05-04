const express = require('express');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.get('/sales', saleController.getAllSales);
router.get('/sales/:id', saleController.getSaleById);
router.post('/sales', saleController.newSale);

module.exports = router;