const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.post('/products', productsController.addProduct);
router.get('/products', productsController.getAllProducts);
// router.get('/products/:id', productsController.getProductsById);

module.exports = router;
