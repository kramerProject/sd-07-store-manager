const express = require('express');
const productController = require('../controllers/productController');
const middlewares = require('../middlewares');

const router = express.Router();

router.get('/products', productController.allProducts);
router.get(
  '/products/:id',
  middlewares.validateProductNotExistMiddleware, 
  productController.oneProduct);
router.post(
  '/products',
  middlewares.validateNameMiddleware,
  middlewares.validateNameDuplicatedMiddleware,
  middlewares.validateQuantityMiddleware, 
  productController.createProduct
);
router.put(
  '/products/:id',
  middlewares.validateNameMiddleware,
  middlewares.validateQuantityMiddleware, 
  productController.updateOneProduct);
//router.delete('/songs/:id', songController.deleteSong);

module.exports = router;