const express = require('express');
const salesController = require('../controllers/SalesController');
const router = express.Router();

router.route('/sales/:id')
  .get(salesController.getSaleById)
  .put(salesController.updateSalesById)
  .delete(salesController.deleteSalesById);

router.route('/sales')
  .post(salesController.createSale)
  .get(salesController.getSale);
  
module.exports = router;