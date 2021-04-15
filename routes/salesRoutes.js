const express = require('express');
const {
  insertSale,
  findAll,
  findById,
  updateSale,
  deleteSale,
} = require('../controller/salesController');

const { validateSale } = require('../middlewares');

const salesRoute = express.Router();

salesRoute.post('/', validateSale, insertSale);

salesRoute.get('/', findAll);

salesRoute.get('/:id', findById);

salesRoute.put('/:id', validateSale, updateSale);

salesRoute.delete('/:id', deleteSale);

module.exports = salesRoute;
