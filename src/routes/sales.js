const express = require('express');
const router = express.Router();
const sales = require('../controllers/salesController');
const middlewares = require('../middlewares');

router.post('/', middlewares.saleQuantityMid, sales.addSales);
router.get('/', sales.getAll);
router.get('/:id', sales.getById);
router.put('/:id', middlewares.saleQuantityMid, sales.updateSale);
router.delete('/:id', sales.deleteSale);

module.exports = router;
