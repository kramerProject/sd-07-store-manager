const express = require('express');

const {
  addSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
} = require('../controller/salesController');

const router = express.Router();

router
  .route('/sales')
  .get(getAllSales)
  .post(addSale);

router
  .route('/sales/:id')
  .get(getSaleById)
  .put(updateSale)
  .delete(deleteSale);


module.exports = router;