const express = require('express');
const { salesController } = require('../../controllers');
const { updateStock } = require('../../middlewares');

const route = express.Router();

route.delete('/sales/:id', updateStock, salesController.deleteSale);

module.exports = route;