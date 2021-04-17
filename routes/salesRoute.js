const express = require('express');
const { insertNewSale, findAll, findById } = require('../controller/salesController');

const salesRouter = express.Router();

salesRouter.post('/sales', insertNewSale);
salesRouter.get('/sales', findAll);
salesRouter.get('/sales/:id', findById);

module.exports = salesRouter;
