const express = require('express');
const app = express.Router();
const salesController = require('../controllers/salesController');
const quantitySalesMiddleware = require('../middlewares/quantitySalesMiddleware');
const salesIsPresentMiddleware = require('../middlewares/salesIsPresentMiddleware');
app.post('/',quantitySalesMiddleware, salesController.insertSales);

app.get('/:id',salesIsPresentMiddleware, salesController.showSalesId);
app.get('/', salesController.showAllSales);

module.exports = app;
