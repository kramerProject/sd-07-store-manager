const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.post('/products', productsController.addNewProduct);
router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getByID);
router.put('/products/:id', productsController.updateByID);
router.delete('/products/:id', productsController.deleteByID);


module.exports = router;
