const express = require('express');
const { salesController } = require('../../controllers');
const { stockAvalible } = require('../../middlewares');

const route = express.Router();

route.post('/sales', stockAvalible, salesController.creatSales);

module.exports = route;