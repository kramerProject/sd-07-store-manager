const express = require('express');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.post('/sales', saleController.addSale);

module.exports = router;