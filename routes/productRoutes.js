const express = require('express');
const productControllers = require('../controllers/productControllers');


const router = express.Router();

router.post('/products', productControllers.registerProduct);
router.get('/products', productControllers.getAll);
router.get('/products/:id', productControllers.getById);
router.put('/products/:id', productControllers.updateProduct);
router.delete('/products/:id', productControllers.deleteProduct);

module.exports = router;