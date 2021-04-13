const express = require('express');

const {
  insertProduct,
  findAll,
  findById,
} = require('../controller/productsController');

const { validateProduct, checkDuplicate } = require('../middlewares');

const productsRoute = express.Router();

productsRoute.post('/', validateProduct, checkDuplicate, insertProduct);

productsRoute.get('/', findAll);

productsRoute.get('/:id', findById);

module.exports = productsRoute;
