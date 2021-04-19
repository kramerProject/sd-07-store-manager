const express = require('express');
const controller = require('../controller');
const router = express.Router();

router.post('/products', controller.createProducts);
router.get('/products', controller.getAll);
router.get('/products/:id', controller.getProductsById);
router.put('/products/:id', controller.updateProducts);
router.delete('/products/:id', controller.deleteProducts);

router.post('/sales', controller.createSales);
// router.get('/sales', controller.getAllSales);
// router.get('/sales/:id', controller.getSalesById);
// router.put('/sales/:id', controller.updateSales);
// router.delete('/sales/:id', controller.deleteSales);

module.exports = router;
