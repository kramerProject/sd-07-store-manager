const express = require('express');

const {
  addSale,
  getAllSales,
  getSaleById,
  // updateProduct,
  // deleteProduct,
} = require('../controller/salesController');

const router = express.Router();

router
  .route('/sales')
  .get(getAllSales)
  .post(addSale);

router
  .route('/sales/:id')
  .get(getSaleById);
//   .put(updateProduct)
//   .delete(deleteProduct);


module.exports = router;