const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/sales', salesController.addSales);
router.get('/sales', salesController.getAllSales);
router.get('/sales/:id', salesController.getSaleById);
router.put('/sales/:id', salesController.updateSaleById);
router.delete('/sales/:id', salesController.excludeSaleById);

module.exports = router;
