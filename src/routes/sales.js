const routes = require('express').Router();
const SalesController = require('../controllers/SalesController');

const { validateSales } = require('../middlewares');

routes.get('/', SalesController.index);
routes.get('/:id', SalesController.get);
routes.put('/:id', validateSales, SalesController.update);
routes.post('/', validateSales, SalesController.create);

module.exports = routes;
