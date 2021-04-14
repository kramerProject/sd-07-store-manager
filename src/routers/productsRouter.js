const express = require('express');
const productsController = require('../controllers/productsController');
const { checkDateCreationMidlleware } = require('../midelleware');

const router = express.Router();

router.get('/products', productsController.getAllproducts);
router.get('/products/:id', productsController.getProductById);
router.post('/products', checkDateCreationMidlleware, productsController.addProduct);
router.put('/products/:id', productsController.updateProduct);
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;
