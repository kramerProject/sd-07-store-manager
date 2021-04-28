const express = require('express');
const productsController = require('../controllers/controllersProducts');
const middleware = require('../middlewares/middlewares');

const router = express.Router();

router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProductById);
router.delete('/products/:id', productsController.deleteProduct);
router.post(
  '/products',
  middleware.validateProductName,
  middleware.validateProductAmmount,
  productsController.addNewProduct
);
router.put(
  '/products/:id',
  middleware.validateLengthName,
  middleware.validateProductAmmount,
  productsController.updateProduct
);

module.exports = router;
