const express = require('express');
const salesController = require('../controllers/salesController');


const route = express.Router();

route.post('/sales', salesController.addSalesController);

module.exports = route;

