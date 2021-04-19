const express = require('express');
const router = express.Router();
const { 
  findAllProducts, 
  findIdProducts, 
  addProducts, 
  editProducts, 
  deleteProducts } = require('../controllers');

router.get('/products', findAllProducts);
router.get('/products/:id', findIdProducts);
router.post('/products', addProducts);
router.put('/products/:id', editProducts);
router.delete('/products:id', deleteProducts);


module.exports = routerProduct;
