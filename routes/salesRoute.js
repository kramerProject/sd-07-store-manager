const express = require('express');
const saleController = require('../controllers/salesControllers');

const router = express.Router();

router.post('/sales', saleController.addSale);
router.get('/sales', saleController.getSales);
router.get('/sales/:id', saleController.getSaleById);
router.put('/sales/:id', saleController.updateSale);
router.delete('/sales/:id', saleController.deleteSale);

module.exports = router;
