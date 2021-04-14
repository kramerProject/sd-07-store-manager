const express = require('express');
const productsController = require('../controllers/productsController');


const route = express.Router();

route.post('/products', productsController.addProducts);
route.get('/products', productsController.getAllProducts);
route.get('/products/:id', productsController.getByIdProducts);

module.exports = route;

