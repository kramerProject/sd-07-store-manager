const express = require('express');
const ProtuctsController = require('../Controllers/ProtuctsController');
const middlewares = require('../Middlewares/middlewares');

const router = express.Router();

router.get('/products', ProtuctsController.getAllProducts);
router.get('/products/:id', ProtuctsController.getProductById);
router.delete('/products/:id', ProtuctsController.deleteProductById);
router.post(
  '/products',
  middlewares.ProductNameMiddleware,
  middlewares.ProductAmountMiddleware,
  ProtuctsController.addProduct,
);
router.put(
  '/products/:id',
  middlewares.SaleNameMiddleware,
  middlewares.ProductAmountMiddleware,
  ProtuctsController.updateProductById,
);

module.exports = router;
