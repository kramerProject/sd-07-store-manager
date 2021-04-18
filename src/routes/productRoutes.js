const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/products', productController.postProducts);
router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProducts);
router.delete('/products/:id', productController.deleteProducts);

module.exports = router;
