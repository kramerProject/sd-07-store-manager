const express = require('express');
const productController = require('../controllers/productsControllers');

const router = express.Router();

router.post('/products', productController.addProduct);
// router.get('/product', productController.getProducts);
// router.get('/product/:id', productController.getProductById);
// router.put('/product/:id', productController.updateProduct);
// router.delete('/product/:id', productController.deleteProduct);

module.exports = router;
