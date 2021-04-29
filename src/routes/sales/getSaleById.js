const express = require('express');
const { salesController } = require('../../controllers');

const route = express.Router();

route.get('/products/:id', salesController.getSaleById);

module.exports = route;
