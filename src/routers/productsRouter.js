const express = require('express');
const productsController = require('../controllers/productsController');
const { checkDateCreationMidlleware,
  checkIdExists, } = require('../midelleware');

const router = express.Router();

router.get('/products', productsController.getAllproducts);
router.get('/products/:id', productsController.getProductById);
router.post('/products', checkDateCreationMidlleware, productsController.addProduct);
router.put('/products/:id',
  checkDateCreationMidlleware,
  productsController.updateProduct);
router.delete('/products/:id', checkIdExists, productsController.deleteProduct);

module.exports = router;
