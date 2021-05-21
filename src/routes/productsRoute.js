const express = require('express');
const productsController = require('../controller/product.js');

const router = express.Router();

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.getById);
router.post('/products', productsController.addProduct);
router.put('/products/:id', productsController.update);
router.delete('/products/:id', productsController.remove);

module.exports = router;
