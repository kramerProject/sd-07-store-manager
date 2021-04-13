const express = require('express');

const {
  insertProduct,
  findAll,
  findById,
  updateProduct,
  deleteProduct,
} = require('../controller/productsController');

const { validateProduct, checkDuplicate } = require('../middlewares');

const productsRoute = express.Router();

productsRoute.post('/', validateProduct, checkDuplicate, insertProduct);

productsRoute.get('/', findAll);

productsRoute.get('/:id', findById);

productsRoute.put('/:id', validateProduct, updateProduct);

productsRoute.delete('/:id', deleteProduct);

module.exports = productsRoute;
