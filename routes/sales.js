const express = require('express');
const {
  createSalesController,
  getAllSalesController,
  getSaleByIdController,
  updateSaleController,
} = require('../controllers/salesController');
const { quantityValidator } = require('../middlewares/sales/validation');

const salesRoute = express.Router();

salesRoute
  .post(
    '/',
    quantityValidator,
    createSalesController,
  )
  .get(
    '/',
    getAllSalesController,
  )
  .get(
    '/:id',
    getSaleByIdController,
  )
  .put(
    '/:id',
    quantityValidator,
    updateSaleController,
  );


module.exports = salesRoute;
