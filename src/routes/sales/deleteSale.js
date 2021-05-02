const express = require('express');
const { salesController } = require('../../controllers');

const route = express.Router();

route.delete('/sales/:id', salesController.deleteSale);

module.exports = route;