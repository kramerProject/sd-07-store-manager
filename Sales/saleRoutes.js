const express = require('express');
const saleController = require('./saleControllers');

const router = express.Router();

router.get('/sales', saleController.getAllSales);
router.get('/sales/:id', saleController.getSaleById);
router.post('/sales', saleController.addSale);
// router.put('/products/:id', productController.uptadeProduct);
// router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
