const express = require('express');
const { 
  insertNewProduct, 
  findAll, 
  findById 
} = require('../controller/productsController.js');
const productsRouter = express.Router();

productsRouter.get('/products', findAll);
productsRouter.get('/products/:id', findById), 
productsRouter.post('/products', insertNewProduct);



module.exports = productsRouter;
