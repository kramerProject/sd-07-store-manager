const express = require('express');

const {
  insertProduct,
  findAll,
  findById,
  updateProduct,
} = require('../controller/productsController');

const { validateProduct, checkDuplicate } = require('../middlewares');

const productsRoute = express.Router();

productsRoute.post('/', validateProduct, checkDuplicate, insertProduct);

productsRoute.get('/', findAll);

productsRoute.get('/:id', findById);

productsRoute.put('/:id', validateProduct, updateProduct);

module.exports = productsRoute;
