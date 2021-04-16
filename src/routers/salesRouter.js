const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/sales', salesController.getAllSales);
router.get('/sales/:id', salesController.getSaleById);
router.post('/sales', salesController.addSale);
router.put('/sales/:id', salesController.updateSale);
router.delete('/sales/:id', salesController.deleteSale);

module.exports = router;
