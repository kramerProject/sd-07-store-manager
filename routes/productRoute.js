const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/products', productController.getProducts);
router.get('/products', productController.getAll);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);


module.exports = router;
