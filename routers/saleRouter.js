const express = require('express');
const router = express.Router();
const { 
  SignSale,
  allSales,
  saleByID,
} = require('../controllers/SaleController');

router.post('/', SignSale);
router.get('/', allSales);
router.get('/:id', saleByID);
// router.get('/', allProducts);
// router.get('/:id', ProductById);
// router.put('/:id', setProduct);
// router.delete('/:id', excludeProduct);

module.exports = router;