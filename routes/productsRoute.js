const express = require('express');
const productsController = require('../controllers/productsController');
const { productMiddleware } = require('../middleware');

const router = express.Router();

router.post('/products', productMiddleware, productsController.createProduct);
router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductById);
router.delete('/products/:id', productsController.deleteProduct);
router.put('/products/:id', productMiddleware, productsController.updateProduct);

module.exports = router;
