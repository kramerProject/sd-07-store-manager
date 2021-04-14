const express = require('express');
const salesController = require('../controllers/salesController');
const { saleMiddleware } = require('../middleware');

const router = express.Router();

router.post('/sales', saleMiddleware, salesController.createSale);
router.get('/sales', salesController.getAllSales);
router.get('/sales/:id', salesController.getSaleById);

module.exports = router;
