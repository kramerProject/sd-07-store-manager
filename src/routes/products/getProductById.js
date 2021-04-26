const express = require('express');
const productsControler = require('../../controllers');

const route = express.Router();

route.get('/products/:id', productsControler.getProductByIdController);

module.exports = route;