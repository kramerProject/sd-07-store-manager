const express = require('express');
const productsController = require('../controller/productsController');

const router = express.Router();

router.post('/products', productsController.insertProduct);
router.get('/products', productsController.findAll);
router.get('/products/:id', productsController.findProductById);

module.exports = router;


