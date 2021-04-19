const express = require('express');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.post('/sales', saleController.addSale);
router.get('/sales', saleController.getAll);
router.get('/sales/:id', saleController.getById);

module.exports = router;