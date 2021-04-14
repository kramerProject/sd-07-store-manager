const express = require('express');
const productsController = require('../controllers/productsControllers');
const { validateProducts } = require('../middlewares');

const router = express.Router();

router.post('/', validateProducts, productsController.addProduct);
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.put('/:id', validateProducts, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;

