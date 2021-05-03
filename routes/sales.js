const express = require('express');

const {
  quantityValidator,
} = require('../middlewares/sales/validation');

const {
  createdQuantitiesManager,
  deletedQuantitiesManager,
} = require('../middlewares/sales/allQuantitiesManager');

const {
  createSalesController,
  getAllSalesController,
  getSaleByIdController,
  updateSaleController,
  deleteSaleController,
} = require('../controllers/salesController');

const salesRoute = express.Router();

salesRoute
  .get(
    '/:id',
    getSaleByIdController,
  )
  .put(
    '/:id',
    quantityValidator,
    updateSaleController,
  )
  .get(
    '/',
    getAllSalesController,
  )
  .post(
    '/',
    quantityValidator,
    createdQuantitiesManager,
    createSalesController,
  )
  .delete(
    '/:id',
    deletedQuantitiesManager,
    deleteSaleController,
  );

module.exports = salesRoute;
