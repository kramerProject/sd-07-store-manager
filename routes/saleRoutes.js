const express = require('express');
const saleController = require('../controller/saleController');

const router = express.Router();

router.post('/sales', saleController.insertSale);

module.exports = router;

