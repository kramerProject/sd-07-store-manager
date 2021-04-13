const routes = require('express').Router();
const SalesController = require('../controllers/SalesController');

const { validateSales } = require('../middlewares');

routes.post('/', validateSales, SalesController.create);

module.exports = routes;
