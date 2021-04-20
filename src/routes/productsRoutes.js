const express = require('express');
const { postNewProduct, getAll, getById } = require('../controller/productsController');

const router = express.Router();

router.get('/products', getAll);
router.get('/products/:id', getById);
router.post('/products', postNewProduct);

module.exports = router;
