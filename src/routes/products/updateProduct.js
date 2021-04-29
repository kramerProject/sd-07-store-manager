const express = require('express');
const { productsControler } = require('../../controllers');

const route = express.Router();

route.put('/products/:id', productsControler.updateProductController);

module.exports = route;