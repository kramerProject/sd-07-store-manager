const express = require('express');
const routes = express.Router();

// Controllers
const { addSale } = require('../controllers/saleController');
const { getSale } = require('../controllers/saleController');
const { gelAllSales } = require('../controllers/saleController');
const { updateSale } = require('../controllers/saleController');
const { deleteSale } = require('../controllers/saleController');

// Middlewares
const validateSaleData = require('../middlewares/validateSaleData');
const validateIdSale = require('../middlewares/validateIdSale');
const validateIdSaleDelete = require('../middlewares/validateIdSaleDelete');

// routes Sales
routes.post('/sales', validateSaleData, addSale);

routes.get('/sales', gelAllSales);
routes.get('/sales/:id', validateIdSale, getSale);

routes.put('/sales/:id', validateSaleData, updateSale);

// juntar esses validates de id
routes.delete('/sales/:id', validateIdSaleDelete, deleteSale);

module.exports = routes;