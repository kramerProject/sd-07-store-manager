const express = require('express');
const { salesController } = require('../../controllers');

const route = express.Router();

route.get('/sales', salesController.getAllSales);
route.use('/sales/:id', salesController.getSaleById);

module.exports = route;