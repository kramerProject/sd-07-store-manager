const express = require('express');
const app = express.Router();
const salesController = require('../controllers/salesController');
const quantitySalesMiddleware = require('../middlewares/quantitySalesMiddleware');
const salesIsPresentMiddleware = require('../middlewares/salesIsPresentMiddleware');
const deleteSaleMiddleware = require('../middlewares/deleteSaleMiddleware');

app.post('/',quantitySalesMiddleware, salesController.insertSales);
app.get('/:id',salesIsPresentMiddleware, salesController.showSalesId);
app.get('/', salesController.showAllSales);
app.delete('/:id',deleteSaleMiddleware,salesController.deleteSale);
module.exports = app;
