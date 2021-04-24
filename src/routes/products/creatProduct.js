const express = require('express');
const productsControler  = require('../../controllers');

const route = express.Router();

route.post('/products', productsControler.creatProductController);

module.exports = route;