const express = require('express');
const productsController = require('../controllers/productsController');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/products', productsController.getAllProducts);
router.post('/products', productsController.createProducts);
router.get('/products/:id', productsController.getProductById);
router.put('/products/:id', productsController.updateProduct);
router.delete('/products/:id', productsController.deleteProduct);

router.post('/sales', salesController.createSales);
router.get('/sales', salesController.getAllSales);


module.exports = router;