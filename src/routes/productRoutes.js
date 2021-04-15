const express = require('express');
const { productController } = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

const {
  nameValidationsMiddleware,
  quantityValidationsMiddleware,
  productIdExistisMiddleware, } = middlewares;

router.get('/products', productController.getAllProducts);
router.post('/products', nameValidationsMiddleware,
  quantityValidationsMiddleware, productController.createProduct);
router.get('/products/:id', productIdExistisMiddleware, productController.getProductById);
router.put('/products/:id', nameValidationsMiddleware,
  quantityValidationsMiddleware, productController.updateProduct);
// router.delete('/products/:id', '');

module.exports = router;