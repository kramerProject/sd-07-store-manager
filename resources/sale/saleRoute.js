const express = require('express');
const rescue = require('express-rescue');

const saleController = require('./saleController');
const saleValidateMiddleware = require('./saleValidateMiddleware');

const router = express.Router();

const SALES_PATH = '/sales';

router.post(SALES_PATH,
  saleValidateMiddleware,
  rescue(saleController.addSale));

/* router.get(SALES_PATH,
  rescue(saleController.getAllSales));
router.get(`${SALES_PATH}/:id`,
  rescue(saleController.getSaleById));
router.put(`${SALES_PATH}/:id`, 
  saleValidateMiddleware, 
  rescue(saleController.updateSale));
router.delete(`${SALES_PATH}/:id`,
  rescue(saleController.deleteSale)); */

module.exports = router; 
