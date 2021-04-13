const express = require('express');
const router = express.Router();
const sales = require('../controllers/salesSales');
const middlewares = require('../services/middlewares');

router.post('/', middlewares.saleValidateQuantity,  sales.addSales);


module.exports = router;

