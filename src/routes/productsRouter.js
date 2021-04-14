var express = require('express');
var router = express.Router();
const Product = require('../controllers/productController');

router.route('/')
  .get(Product.findAll)
  .post(Product.create);

router.route('/:id')
  .get(Product.findById)
  .put(Product.update)
  .delete(Product.remove);


module.exports = router;