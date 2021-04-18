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
/*
router.put(
  '/products/:id',
  middlewares.validateNameMiddleware,
  middlewares.validateQuantityMiddleware, 
  productController.updateOneProduct);
router.delete('/products/:id',
  middlewares.validateProductNotExistMiddleware,
  productController.deleteProduct);
*/
module.exports = router;