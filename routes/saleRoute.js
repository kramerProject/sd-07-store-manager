const express = require('express');
const saleController = require('../controllers/saleController');
const middlewares = require('../middlewares');

const router = express.Router();
/*
router.get('/products', productController.allProducts);
router.get(
  '/products/:id',
  middlewares.validateProductNotExistMiddleware, 
  productController.oneProduct);
  */
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