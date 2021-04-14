const express = require('express');
const salesController = require('../controller/salesController');

const router = express.Router();

router.post('/sales', salesController.addSales);
router.get('/sales', salesController.getAll);
router.get('/sales/:id', salesController.getSaleById);
router.put('/sales/:id', salesController.updateById);
router.delete('/sales/:id', salesController.deleteSale);

module.exports = router;
