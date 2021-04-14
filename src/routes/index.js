const routes = require('express').Router();

const routeProducts = require('./productsRouter');
const routeSales = require('./salesRouter');

routes.use('/products', routeProducts);
routes.use('/sales', routeSales);

module.exports = routes;
