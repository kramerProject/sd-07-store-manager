const express = require('express');

const {
  addSale,
} = require('../controller/salesController');
// getAllProducts,
// getProductById,
// updateProduct,
// deleteProduct,

const router = express.Router();

router
  .route('/sales')
  // .get(getAllProducts)
  .post(addSale);

// router
//   .route('/products/:id')
//   .get(getProductById)
//   .put(updateProduct)
//   .delete(deleteProduct);


module.exports = router;