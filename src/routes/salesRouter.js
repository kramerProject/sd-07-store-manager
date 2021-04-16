var express = require('express');
var router = express.Router();
const Sale = require('../controllers/saleController');
const validateId = require('../middlewares/validateId');
const existingSale = require('../middlewares/existingSale');
const validate = require('../middlewares/validationsSales');
const updateProductQuantity = require('../middlewares/updateProductQuantity');
// const { validateSale, validateId, validateProduct } = require('../middlewares/validationsSales');

router.route('/')
  .get(Sale.findAll)
  .post(
    validate.validateSale,
    validate.validateProduct,
    updateProductQuantity,
    Sale.create
  );

router.route('/:id')
  .get(existingSale, Sale.findById)
  .put(
    validateId,
    validate.validateSale,
    existingSale,
    updateProductQuantity,
    Sale.update)
  .delete(validateId, updateProductQuantity, Sale.remove);

module.exports = router;