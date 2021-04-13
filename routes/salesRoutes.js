const express = require('express');
const {
  insertSale,
} = require('../controller/salesController');

const { validateSale } = require('../middlewares');

const salesRoute = express.Router();

salesRoute.post('/', validateSale, insertSale);

module.exports = salesRoute;
