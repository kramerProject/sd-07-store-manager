const express = require('express');
const productController = require('../controllers/productController');

const productsRouter = express.Router();


productsRouter.get('/products', productController);
productsRouter.get('products/:id', productController);
productsRouter.post('/products', productController);
productsRouter.put('/products/:id', productController);
productsRouter.delete('/products/:id', productController);

module.exports = productsRouter;
