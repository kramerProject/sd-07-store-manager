const express = require('express');
const { insertNewSale } = require('../controller/salesController');

const salesRouter = express.Router();

salesRouter.post('/sales', insertNewSale);

module.exports = salesRouter;
