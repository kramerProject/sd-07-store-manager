const express = require('express');
const router = express.Router();
const sales = require('../controllers/salesSales');
const middlewares = require('../services/middlewares');


router.post('/', middlewares.saleValidateQuantity, sales.addSales);
router.get('/', sales.getAll);
router.get('/:id', sales.getById);
router.put('/:id', middlewares.saleValidateQuantity, sales.updateSale);
router.delete('/:id',sales.deleteSale);


module.exports = router;

