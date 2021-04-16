const express = require('express');
const { insertNewProduct, findAll } = require('../controller/productsController.js');
const productsRouter = express.Router();


productsRouter.post('/products', insertNewProduct);
productsRouter.get('/products', findAll);

module.exports = productsRouter;