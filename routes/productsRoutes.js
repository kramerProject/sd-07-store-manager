const express = require('express');
const STATUS_CODE = require('../helper');
const { productsController } = require('../controllers');

const route = express.Router();

route.post('/products', productsController.productRegistration);

module.exports = route;
