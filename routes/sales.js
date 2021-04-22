const express = require('express');
const salesController = require('../controllers/SalesController');
const router = express.Router();

router.route('/sales/:id')
  .get(salesController.getSalesById)
  .put(salesController.updateSalesById)
  .delete(salesController.deleteSalesById);

router.route('/sales')
  .post(salesController.createSale)
  .get(salesController.getSale);
  
module.exports = router;