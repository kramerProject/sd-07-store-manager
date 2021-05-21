const routes = require('express').Router();

routes.get('/', productsController);

module.exports = routes;