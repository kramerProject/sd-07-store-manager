const express = require('express');
const app = express.Router();

const productController = require('../controllers/productController');
const nameMiddleware = require('../middlewares/nameMiddleware');
const quantityMiddleware = require('../middlewares/quantityMiddlewares');
const productIdMiddleware = require('../middlewares/productIdMiddleware');
const nameLengthMiddleware = require('../middlewares/nameLengthMiddleware');

app.get('/', productController.showAllProducts);
app.get('/:id', productIdMiddleware, productController.showProductId);
app.put('/:id',
  quantityMiddleware,
  nameLengthMiddleware,
  productController.updateProduct);

app.use(nameMiddleware);
app.use(quantityMiddleware);
app.post('/', productController.insertProduct);

module.exports = app;
