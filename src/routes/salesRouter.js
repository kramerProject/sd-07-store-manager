var express = require('express');
var router = express.Router();
const Sale = require('../controllers/saleController');
const validateId = require('../middlewares/validateId');
const existingSale = require('../middlewares/existingSale');
const validate = require('../middlewares/validationsSales');
// const { validateSale, validateId, validateProduct } = require('../middlewares/validationsSales');

router.route('/')
  .get(Sale.findAll)
  .post(validate.validateSale, validate.validateProduct, Sale.create);

router.route('/:id')
  .get(existingSale, Sale.findById)
  .put(validateId, validate.validateSale, existingSale, Sale.update)
  .delete(validateId, Sale.remove);

module.exports = router;