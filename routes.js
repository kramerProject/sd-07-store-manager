const express = require('express');

const { createProduct } = require('./controllers/productController');

const { validateNameMiddleware } = require('./middlewares/productMiddlewares');

const route = express.Router();

route.post('/products', validateNameMiddleware, createProduct);

module.exports = route;
