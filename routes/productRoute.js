const express = require('express');
const productController = require('../controllers/productController');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/products', productController.getAll);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.getProducts);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

router.get('/sales/', salesController.getAll);
router.get('/sales/:id', salesController.getSalesById);
router.post('/sales', salesController.createSales);
router.put('/sales/:id', salesController.updateSale);
router.delete('/sales/:id', salesController.deleteSale);


module.exports = router;
