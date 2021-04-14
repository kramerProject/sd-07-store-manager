const express = require('express');
const rescue = require('express-rescue');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.post('/products', rescue(productsController.createProduct));
router.get('/products', rescue(productsController.getAllProducts));
router.get('/products/:id', rescue(productsController.getProductsById));
router.put('/products/:id', rescue(productsController.updateProduct));

module.exports = router;
