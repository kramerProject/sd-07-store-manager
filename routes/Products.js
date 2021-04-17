const express = require('express');
const Products = require('../Controllers/Products');

const router = express.Router();

router.route('/products/:id')
  .get(Products.getByProductId)
  .put(Products.updateByProductId)
  .delete(Products.deleteByProductId);

router.route('/products')
  .post(Products.create)
  .get(Products.getProduct);


module.exports = router;