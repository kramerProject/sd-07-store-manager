const express = require('express');
const { createSalesController } = require('../controllers/salesController');
const { quantityValidator } = require('../middlewares/sales/validation');

const salesRoute = express.Router();

salesRoute
  .post(
    '/',
    quantityValidator,
    createSalesController,
  );


module.exports = salesRoute;
