const express = require('express');
const app = express();
const {
  controllerProduct,
  getAllProduct,
  getByIdProduct,
  updateById,
  delById
} = require('../controllers/productController');
const { checkAddProduct,
  checkEqualProduct, checkId } = require('../middlewares/productMiddleware');



app.get('/products/:id',checkId, getByIdProduct);
app.put('/products/:id',checkAddProduct, checkId, updateById);
app.get('/products', getAllProduct);
app.post('/products', checkAddProduct, checkEqualProduct, controllerProduct);
app.delete('/products/:id',checkId, delById);

module.exports = app;
