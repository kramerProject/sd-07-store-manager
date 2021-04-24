const express = require('express');
const productsControler = require('../../controllers');

const route = express.Router();

route.get('/products', productsControler.getAllProductController);

module.exports = route;