const express = require('express');

const { insertProduct } = require('../controller/productsController');

const { validateProduct, checkDuplicate } = require('../middlewares');

const productsRoute = express.Router();

productsRoute.post('/', validateProduct, checkDuplicate, insertProduct);

module.exports = productsRoute;
