const express = require('express');
const controller = require('../controller');
const router = express.Router();

router.post('/products', controller.createProducts);

module.exports = router;
