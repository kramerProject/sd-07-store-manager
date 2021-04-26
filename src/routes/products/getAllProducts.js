const express = require('express');
const productById = require('./getProductById');
const productsControler = require('../../controllers');

const route = express.Router();

route.get('/products', productsControler.getAllProductController);
route.use(productById);

module.exports = route;