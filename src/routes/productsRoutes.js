const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/products', productController.getAll);

router.get('/products/:id', productController.getById);

router.post('/products', productController.add);

router.put('/products/:id', productController.update);

router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
