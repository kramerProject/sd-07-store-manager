const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');
const { quantityOrWrongId, idSaleValidate, stockControl } = require('../middlewares');

const router = express.Router();

router.get('/sales/:id', idSaleValidate, rescue(salesController.getById));
router.delete(
  '/sales/:id', 
  idSaleValidate, 
  stockControl, 
  rescue(salesController.deleteSale)
);
router.get('/sales', rescue(salesController.getAll));
router.post('/sales', quantityOrWrongId, stockControl, rescue(salesController.create));
router.put(
  '/sales/:id', 
  quantityOrWrongId, 
  idSaleValidate, 
  stockControl, rescue(salesController.update),
);

module.exports = router;

