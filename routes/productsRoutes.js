const express = require('express');
const productsController = require('../controllers/productsController');


const route = express.Router();

route.post('/products', productsController.addProductsController);
route.get('/products', productsController.getAllProductsController);
route.get('/products/:id', productsController.getByIdProductsController);
route.put('/products/:id', productsController.putByIdProductsController);
route.delete('/products/:id', productsController.excludeController);

module.exports = route;

