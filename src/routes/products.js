const express = require('express');
const router = express.Router();
const products = require('../controllers/productController');
const middlewares = require('../services/middlewares');

router.post('/', middlewares.productValidateName,
    middlewares.productValidateQuantity,
    products.addProduct);


module.exports = router;