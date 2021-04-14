const express = require('express');
const productsController = require('../controllers/productsController');
const middleware = require('../middlewares/middlewares');

const router = express.Router();

router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductById);
router.delete('/products/:id', productsController.deleteProduct);
router.post(
  '/products',
  middleware.validateProductName,
  middleware.validateProductQuantity,
  productsController.addProduct
);
router.put(
  '/products/:id',
  middleware.validateJustName,
  middleware.validateProductQuantity,
  productsController.updateProduct
);

module.exports = router;
