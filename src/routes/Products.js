const express = require('express');
const app = express();
const {
  controllerProduct,
  getAllProduct,
  getByIdProduct,
  updateById,
  delById,
  controllerSales,
  allSales,
  saleById,
  updateSaleById
} = require('../controllers/productController');
const { checkAddProduct,
  checkEqualProduct, checkId,
  checkAddSale,
  checkSaleValid } = require('../middlewares/productMiddleware');


  
app.post('/products', checkAddProduct, checkEqualProduct, controllerProduct);
app.get('/products/:id',checkId, getByIdProduct);
app.put('/products/:id',checkAddProduct, checkId, updateById);
app.get('/products', getAllProduct);
app.delete('/products/:id',checkId, delById);

//Sales Endpoints

app.post('/sales',checkAddSale, controllerSales);
app.get('/sales', allSales);
app.get('/sales/:id', checkId, saleById);
app.put('/sales/:id',checkAddSale, checkId, updateSaleById);


module.exports = app;
