const express = require('express');
const productsController = require('../controller/productsController');

const router = express.Router();

router.post('/products', productsController.insertProduct);

module.exports = router;


