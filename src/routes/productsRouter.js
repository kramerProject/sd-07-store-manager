var express = require('express');
var router = express.Router();
const Product = require('../controllers/productController');
const { validateProduct, validateId } = require('../middlewares/validationsProduct');
const existingProduct = require('../middlewares/existingProduct');

router.route('/')
  .get(Product.findAll)
  .post(validateProduct, existingProduct, Product.create);

router.route('/:id')
  .get(validateId, Product.findById)
  .put(validateId, validateProduct, Product.update)
  .delete(validateId, Product.remove);


module.exports = router;