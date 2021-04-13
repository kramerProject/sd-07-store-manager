const { Router } = require('express');

const { SalesService } = require('../services');

const salesRoute = Router();

salesRoute.get('/', SalesService.getAll);

salesRoute.post('/', SalesService.create);

module.exports = salesRoute;
