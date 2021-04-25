const express = require('express');
const Product = require('./controller/Products');
const Sale = require('./controller/Sales');

const router = express.Router();
//products routes
router.get('/products', Product.findAllProducts);
router.get('/products/:id', Product.findProductById);
router.post('/products', Product.addProduct);
router.put('/products/:id', Product.updateProduct);
router.delete('/products/:id', Product.deleteProduct);
//sales routes
router.get('/sales', Sale.findAllSales);
router.get('/sales/:id', Sale.findSaleById);
router.post('/sales', Sale.addSales);
router.put('/sales/:id', Sale.updateSale);
router.delete('/sales/:id', Sale.deleteSale);

module.exports = router;
