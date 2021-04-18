const express = require('express');
const STATUS_CODE = require('../helper');
const { productsController } = require('../controllers');

const route = express.Router();

route.post('/products', productsController.productRegistration);
route.get('/products', productsController.allProductsList);
route.get('/products/:id', productsController.getProductByID); // (_, res) => { res.send('deu bom'); }

module.exports = route;
