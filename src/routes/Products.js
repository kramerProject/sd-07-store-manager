const express = require('express');
const app = express();
const {
  controllerProduct,
  getAllProduct,
  getByIdProduct,
} = require('../controllers/productController');
const { checkAddProduct,
  checkEqualProduct, checkId } = require('../middlewares/productMiddleware');

app.get('/products/:id',checkId, getByIdProduct);
app.get('/products', getAllProduct);
app.post('/products', checkAddProduct, checkEqualProduct, controllerProduct);

module.exports = app;
