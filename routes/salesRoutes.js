const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/sales', salesController.addSales);
router.get('/sales', salesController.getAllSales);
router.get('/sales/:id', salesController.getSaleById);

module.exports = router;
