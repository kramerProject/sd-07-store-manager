const express = require('express');
const { postNewProduct, getAll, getById } = require('../controller/productsController');

const router = express.Router();

router.post('/products', postNewProduct);
router.get('/products', getAll);
router.get('/products/:id', getById);

module.exports = router;
