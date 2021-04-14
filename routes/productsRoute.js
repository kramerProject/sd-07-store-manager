const express = require('express');
const productController = require('../controllers/productsControllers');

const router = express.Router();

router.post('/products', productController.addProduct);
router.get('/products', productController.getProducts);
router.get('/products/:id', productController.getProductById);
// router.put('/products/:id', productController.updateProduct);
// router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
