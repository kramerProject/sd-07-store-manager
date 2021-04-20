const express = require('express');
const salesController = require('../controllers/salesController');


const route = express.Router();

route.post('/sales', salesController.addSalesController);
route.get('/sales', salesController.getAllSalesController);
route.get('/sales/:id', salesController.getByIdSalesController);
route.put('/sales/:id', salesController.putByIdSalesController);
route.delete('/sales/:id', salesController.deleteSalesController);

module.exports = route;

