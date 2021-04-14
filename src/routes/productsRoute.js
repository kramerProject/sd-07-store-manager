const express = require('express');
const { handleNewProduct } = require('../controllers/productsController');

const router = express.Router();

router.post('/products', handleNewProduct);

module.exports = router;
