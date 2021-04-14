const express = require('express');
const productController = require('../Controllers/productController');

const router = express.Router();

router.post('/products', productController.addProduct);
router.get('/products', productController.getAllProduct);
router.get('/products/:id', productController.getForId);
router.put('/products/:id', productController.updateForId);
router.delete('/products/:id', productController.deleteForId);

module.exports = router;