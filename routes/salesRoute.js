const express = require('express');
const rescue = require('express-rescue');
const salesController = require('../controllers/salesController');
const { quantityOrWrongId, idSaleValidate } = require('../middlewares');

const router = express.Router();

router.get('/sales/:id', idSaleValidate, rescue(salesController.getById));
router.get('/sales', rescue(salesController.getAll));
router.post('/sales', quantityOrWrongId, rescue(salesController.create));
router.put(
  '/sales/:id', 
  quantityOrWrongId, 
  idSaleValidate, 
  rescue(salesController.update),
);

module.exports = router;

