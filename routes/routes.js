
const express = require('express');
const productsController = require('../controllers/products');
const salesController = require('../controllers/sales');

const router = express.Router();

router.get('/products', productsController.getProducts);

router.get('/products/:id', productsController.getProductById);

router.post('/products', productsController.registerProduct);

router.put('/products/:id', productsController.updateProduct);

router.delete('/products/:id', productsController.deleteProduct);

router.post('/sales', salesController.registerSales);

router.get('/sales', salesController.getSales);

router.get('/sales/:id', salesController.getSaleById);

router.delete('/sales/:id', salesController.deleteSale);

router.put('/sales/:id', salesController.updateSales);

module.exports = router;