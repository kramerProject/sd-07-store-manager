const express = require('express');
const STATUS_CODE = require('../helper');
const { salesController } = require('../controllers');

const route = express.Router();

// (_, res) => { res.send('deu bom'); }
route.post('/sales', salesController.salesRegistration);
route.get('/sales', salesController.getSales);
route.get('/sales/:id', salesController.getSaleByID);
route.put('/sales/:id', salesController.updateSale);

module.exports = route;
