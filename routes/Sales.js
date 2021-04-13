const express = require('express');
const Sales = require('../Controllers/Sales');

const router = express.Router();

router.route('/sales')
  .post(Sales.create)
  .get(Sales.getSales);

router.route('/sales/:id')
  .get(Sales.getBySaleId)
  .put(Sales.updateSale)
  .delete(Sales.deleteSale);

module.exports = router;