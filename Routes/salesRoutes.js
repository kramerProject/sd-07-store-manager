const express = require('express');
const salesController = require('../Controllers/salesController');

const router = express.Router();

router.post('/sales', salesController.addSales);
router.get('/sales', salesController.getAllSales);
router.get('/sales/:id', salesController.getAllSalesForId);

module.exports = router;