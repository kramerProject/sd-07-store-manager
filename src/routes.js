const { Router } = require('express');
const ProductController = require('./Controllers/ProductsController');

const routes = Router();

routes.post('/products', ProductController.create);
routes.get('/products', ProductController.findAll);

module.exports = { routes };
