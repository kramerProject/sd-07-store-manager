const express = require('express');
const productsController = require('../controller/productsController');

const router = express.Router();

// router.get('/products', productsController.getAllProducts);
// router.get('/products/:id', productsController.getProductsById);
router.post('/products', productsController.addProducts);
// router.put('/products/:id', productsController.updateProducts);
// router.delete('/products/:id', productsController.deleteProducts);

module.exports = router;