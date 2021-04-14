const express = require('express');
const productController = require('./productControllers');

const router = express.Router();

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.post('/products', productController.addProduct);
router.put('/products/:id', productController.uptadeProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
