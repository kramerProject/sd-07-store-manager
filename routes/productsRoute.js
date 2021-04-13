const express = require('express');

const router = express.Router();

router.post('/products', productsController.addProduct);

module.exports = router;
