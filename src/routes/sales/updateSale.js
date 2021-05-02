const express = require('express');
const { salesController } = require('../../controllers');

const route = express.Router();

route.put('/sales/:id', salesController.updateSale);

module.exports = route;