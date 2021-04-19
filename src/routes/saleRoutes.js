const express = require('express');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.post('/sales', saleController.postSales);

module.exports = router;
