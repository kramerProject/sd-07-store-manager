const express = require('express');
const productsController = require('../controllers/productsController');
const { newProductMiddleware } = require('../middleware');

const router = express.Router();

router.post('/products', newProductMiddleware, productsController.createProduct);
router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductById);
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;
