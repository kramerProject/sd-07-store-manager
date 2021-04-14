const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/products', productsController.getAllProducts);
router.post('/products', productsController.createProducts);
router.get('/products/:id', productsController.getProductById);

module.exports = router;