const express = require('express');
const router = express.Router();
const products = require('../controllers/productController');
const middlewares = require('../services/middlewares');

router.post('/', middlewares.productValidateName,
  middlewares.productValidateQuantity,
  products.addProduct);

router.get('/:id', products.getById);
router.get('/', products.getAll);
router.put('/:id',
  middlewares.productValidateName,
  middlewares.productValidateQuantity,
  products.updateProduct);

router.delete('/:id', products.deleteProduct);


module.exports = router;