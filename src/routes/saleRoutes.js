const express = require('express');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.post('/sales', saleController.postSales);
router.get('/sales', saleController.getAllSales);
router.get('/sales/:id', saleController.getSaleById);

module.exports = router;
