const express = require('express');
const saleController = require('../controllers/saleController');
const middlewares = require('../middlewares');

const router = express.Router();

router.get('/sales', saleController.allSales);

router.get(
  '/sales/:id',
  middlewares.validateSaleExistsMiddleware, 
  saleController.oneSale);

router.post(
  '/sales',
  middlewares.validateSaleProdQuantityMiddleware, 
  saleController.createSale);

router.put(
  '/sales/:id',
  middlewares.validateSaleProdQuantityMiddleware,  
  saleController.updateOneSale);

router.delete('/sales/:id',
  middlewares.validateSaleExcludeMiddleware,
  saleController.deleteSale);

module.exports = router;