const express = require('express');
const router = express.Router();
const { 
  SignSale,
  allSales,
  saleByID,
  excludeSale,
  setSale
} = require('../controllers/SaleController');

router.post('/', SignSale);
router.get('/', allSales);
router.get('/:id', saleByID);
// router.get('/', allProducts);
// router.get('/:id', ProductById);
router.put('/:id', setSale);
router.delete('/:id', excludeSale);

module.exports = router;