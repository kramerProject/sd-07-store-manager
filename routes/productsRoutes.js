const express = require('express');
const productsService = require('../services/productsService');

const router = express.Router();

router.get('/products', productsService.insertProduct);
