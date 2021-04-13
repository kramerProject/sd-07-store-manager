const routes = require('express').Router();
const ProductController = require('../controllers/ProductController');

const { validadeProduct } = require('../middlewares');

routes.get('/', ProductController.index);
routes.get('/:id', ProductController.get);
routes.post('/', validadeProduct, ProductController.create);

module.exports = routes;
