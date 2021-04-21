const express = require('express');
const {
  createNewSales,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
} = require('../controllers');

const router = express.Router();

router.post('/sales', createNewSales);
router.get('/sales', getAllSales);
router.get('/sales/:id', getSaleById);
router.put('/sales/:id', updateSaleById);
router.delete('/sales/:id', deleteSaleById);


module.exports = router;
