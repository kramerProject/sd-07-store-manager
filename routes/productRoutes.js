const express = require('express');

const productController = require('../controllers/productController');
const middleware = require('../middlewares');

const router = express.Router();

router.get('/products', productController.getAllProducts);

router.use(middleware.productMiddleware);

router.post('/products', productController.addProduct);

module.exports = router;
