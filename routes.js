const express = require('express');

const productController = require('./controllers/ProductController');
const saleController = require('./controllers/SaleController');

const routes = express.Router();

routes.post('/products', productController.create);
routes.get('/products', productController.findAll);
routes.get('/products/:id', productController.findById);
routes.put('/products/:id', productController.update);
routes.delete('/products/:id', productController.delete);

routes.post('/sales', saleController.create);

module.exports = routes;
