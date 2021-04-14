const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/products', productsController.getAllProducts);
router.post('/products', productsController.createProducts);
router.get('/products/:id', productsController.getProductById);
router.put('/products/:id', productsController.updateProduct);
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;