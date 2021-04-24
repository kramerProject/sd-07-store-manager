
const express = require('express');
const productsController = require('../controllers/productsController');
const {validateProduct, validateId} = require('../middlewares');

const router = express.Router();

router.get('/products', productsController.getAllProducts);
router.get('/products/:id', validateId, productsController.getProductById);
router.post('/products', validateProduct, productsController.addProduct);
router.put('/products/:id',validateId, validateProduct, productsController.updateProduct);
router.delete('/products/:id', validateId, productsController.deleteProduct);

module.exports = router;
