const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.post('/products', productsController.addProduct);

module.exports = router;
