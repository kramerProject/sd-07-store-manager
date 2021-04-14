var express = require('express');
var router = express.Router();
const Sale = require('../controllers/saleController');

router.route('/')
  .get(Sale.findAll)
  .post(Sale.create);

router.route('/:id')
  .get(Sale.findById)
  .put(Sale.update)
  .delete(Sale.remove);

module.exports = router;