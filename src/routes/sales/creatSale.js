const express = require('express');
const { salesController } = require('../../controllers');

const route = express.Router();

route.post('/sales', salesController.creatSales);

module.exports = route;