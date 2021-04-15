const express = require('express');

const { productsController } = require('../controllers');
const { productCreate, productDelete, productReady, productUpdate } = productsController;

const { productsMiddleware }  = require('../middlewares');
const { validateProductNameAndQuantity } = productsMiddleware;

const Products = express.Router();

Products.get('/products', productReady);

Products.post('/products', validateProductNameAndQuantity, productCreate);

Products.put('/products', productUpdate);

Products.delete('/products', productDelete);

module.exports = Products;
