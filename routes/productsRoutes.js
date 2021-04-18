const express = require('express');
const STATUS_CODE = require('../helper');
const { productsController } = require('../controllers');

const route = express.Router();

// (_, res) => { res.send('deu bom'); }
route.post('/products', productsController.productRegistration);
route.get('/products', productsController.allProductsList);
route.get('/products/:id', productsController.getProductByID);
route.put('/products/:id', productsController.updateProduct);

module.exports = route;
