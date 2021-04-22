const express = require('express');
const salesController = require('../controller/salesController');

const router = express.Router();

router.post('/sales', salesController.insertSale);
router.get('/sales', salesController.findAll);
router.get('/sales/:id', salesController.findSaleById);
router.put('/sales/:id', salesController.updateSaleById);
router.delete('/sales/:id', salesController.deleteSale);

module.exports = router;
