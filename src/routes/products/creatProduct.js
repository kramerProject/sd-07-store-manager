const express = require('express');
const productsControler  = require('../../controllers');
const updateProduct = require('./updateProduct');

const route = express.Router();

route.post('/products', productsControler.creatProductController);
route.use(updateProduct);

module.exports = route;