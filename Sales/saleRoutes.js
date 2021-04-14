const express = require('express');
const saleController = require('./saleControllers');

const router = express.Router();

// router.get('/products', productController.getAllProducts);
// router.get('/products/:id', productController.getProductById);
router.post('/sales', saleController.addSale);
// router.put('/products/:id', productController.uptadeProduct);
// router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
