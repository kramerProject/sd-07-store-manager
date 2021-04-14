const { Router } = require('express');
const productsRoutes = Router();
const ProductsController = require('../controllers/productsController');

productsRoutes.get('/', ProductsController.getAllProducts);
productsRoutes.get('/:id', ProductsController.findProductById);
productsRoutes.post('/', ProductsController.create);
productsRoutes.put('/:id', ProductsController.update);

module.exports = productsRoutes;
