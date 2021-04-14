const express = require('express');
const {
  insertSale,
  findAll,
  findById,
} = require('../controller/salesController');

const { validateSale } = require('../middlewares');

const salesRoute = express.Router();

salesRoute.post('/', validateSale, insertSale);

salesRoute.get('/', findAll);

salesRoute.get('/:id', findById);

module.exports = salesRoute;
