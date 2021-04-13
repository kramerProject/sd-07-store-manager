const routes = require('express').Router();

const routeProducts = require('./productsRouter');

routes.use('/products', routeProducts);

module.exports = routes;
