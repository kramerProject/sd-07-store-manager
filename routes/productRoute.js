const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/products', productController.addProduct);
router.get('/products', productController.getAll);
router.get('/products/:id', productController.getById);


module.exports = router;