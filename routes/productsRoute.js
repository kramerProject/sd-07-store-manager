const express = require('express');
const app = express.Router();

const productController = require('../controllers/productController');
const nameMiddleware = require('../middlewares/nameMiddleware');
const quantityProductMiddlewares = require('../middlewares/quantityProductMiddlewares');
const productIdMiddleware = require('../middlewares/productIdMiddleware');
const nameLengthMiddleware = require('../middlewares/nameLengthMiddleware');
const productIsPresentMiddleware = require('../middlewares/productIsPresentMiddleware');

app.get('/', productController.showAllProducts);
app.get('/:id', productIdMiddleware, productController.showProductId);
app.delete('/:id',productIsPresentMiddleware, productController.deleteProduct);
app.put('/:id',
  quantityProductMiddlewares,
  nameLengthMiddleware,
  productController.updateProduct);

app.use(nameMiddleware);
app.use(quantityProductMiddlewares);
app.post('/', productController.insertProduct);

module.exports = app;
