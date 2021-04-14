const express = require('express');
const productController = require('../controllers/productController');
const middleware = require('../middlewares');

const router = express.Router();

router.post('/products', middleware.productPostMiddleware, productController.create);
router.get('/products', productController.findAll);
router.get('/products/:id', middleware.productExistMiddleware,
  productController.findById);
router.put('/products/:id', middleware.productUpdateMiddleware, productController.update);
router.delete('/products/:id', middleware.productExistMiddleware,
  productController.exclude);

router.use(middleware.errorMiddleware);

module.exports = router;
