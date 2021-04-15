const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductController');

router.get('/products', productController.getAllProducts);
// router.get('/products/:id', '');
// router.post('/products', '');
// router.put('/products/:id', '');
// router.delete('/products/:id', '');

module.exports = router;