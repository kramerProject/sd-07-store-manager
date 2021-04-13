const express = require('express');
const productControllers = require('../controllers/productControllers');

const router = express.Router();

router.post('/products', productControllers.registerProduct);

module.exports = router;