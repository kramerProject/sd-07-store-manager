const express = require('express');
const rescue = require('express-rescue');

const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/sales', rescue(salesController.createSale));
// router.get('/products', rescue(productsController.getAllProducts));
// router.get('/products/:id', rescue(productsController.getProductsById));
// router.put('/products/:id', rescue(productsController.updateProduct));
// router.delete('/products/:id', rescue(productsController.deleteProduct));

module.exports = router;
