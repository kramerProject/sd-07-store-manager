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

// routes Sales
routes.post('/sales', validateSaleData, addSale);

routes.get('/sales', gelAllSales);
routes.get('/sales/:id', validateIdSale, getSale);

routes.put('/sales/:id', validateSaleData, updateSale);

routes.delete('/sales/:id', validateIdSale, deleteSale);

module.exports = routes;