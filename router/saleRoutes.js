const express = require('express');
const salesControllers = require('../controllers/salesControllers');
const { validateSales, verifyStock } = require('../middlewares');

const router = express();

router.post('/',  validateSales, verifyStock, salesControllers.addSale);
router.get('/', salesControllers.getAllSales);
router.get('/:id', salesControllers.getSaleById);
router.put('/:id', validateSales, salesControllers.updateSale);
router.delete('/:id', salesControllers.deleteSale);

module.exports = router;
