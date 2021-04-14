const express = require('express');
const { productController } = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

const { nameValidationsMiddleware, quantityValidationsMiddleware } = middlewares;

router.get('/products', productController.getAll);
router.post('/products', nameValidationsMiddleware,
  quantityValidationsMiddleware, productController.createProduct);
// router.get('/products/:id', '');
// router.put('/products/:id', '');
// router.delete('/products/:id', '');

module.exports = router;