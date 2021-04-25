const express = require('express');
const productsControler  = require('../../controllers');

const route = express.Router();

route.delete('/products/:id', productsControler.deletProductController);

module.exports = route;