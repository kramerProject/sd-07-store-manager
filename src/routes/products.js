const routes = require('express').Router();
const ProductController = require('../controllers/ProductController');

const { validadeProduct } = require('../middlewares');

routes.post('/', validadeProduct, ProductController.create);

module.exports = routes;
