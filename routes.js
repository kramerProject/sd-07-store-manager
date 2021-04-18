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
routes.get('/sales', saleController.getAll);
routes.get('/sales/:id', saleController.getById);
routes.put('/sales/:id', saleController.update);
routes.delete('/sales/:id', saleController.delete);

module.exports = routes;
