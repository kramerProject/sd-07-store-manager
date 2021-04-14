const express = require('express');
const rescue = require('express-rescue');

const productsController = require('../controllers/productsController');

const router = express.Router();

router.post('/products', rescue(productsController.createProduct));

module.exports = router;
