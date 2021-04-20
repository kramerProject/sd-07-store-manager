const express = require('express');
const salesController = require('../controllers/salesController');


const route = express.Router();

route.post('/sales', salesController.addSalesController);
route.get('/sales', salesController.getAllSalesController);
route.get('/sales/:id', salesController.getByIdSalesController);

module.exports = route;

