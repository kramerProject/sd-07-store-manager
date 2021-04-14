const express = require('express');
const productsController = require('../controller/productsController');

const router = express.Router();

router.post('/products', productsController.addProduct);
router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.getByProductId);
router.put('/products/:id', productsController.updateById);
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;
