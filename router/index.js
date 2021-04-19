const express = require('express');
const controller = require('../controller');
const router = express.Router();

router.post('/products', controller.createProducts);
router.get('/products', controller.getAll);
router.get('/products/:id', controller.getProductsById);
// router.put('/products/:id', controller.updateProducts);
// router.delete('/products/:id', controller.deleteProducts);

module.exports = router;
