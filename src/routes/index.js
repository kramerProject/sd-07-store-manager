const express = require('express');
const app = express();

// Import Products
const { addProduct } = require('../Controllers/addProductController');
const { addProductMiddleware } = require('../Middleware/middlewareAddProduct');
const { getAllProductController } = require('../Controllers/getAllProductController');
const {getProductByidController} = require('../Controllers/getProductByIdController');
const { getByIdMiddleware } = require('../Middleware/middlewareGetProductById');
const {updateProductMiddleware} = require('../Middleware/middlewareUpdateProduct');
const {updateProductController} = require('../Controllers/updateProductController');
const {deleteProductMiddleware} = require('../Middleware/middlewareDelectProduct');
const {deleteProductController} = require('../Controllers/deleteProductController');

// Import sales
const { addSale } = require('../Controllers/sales/addSaleController');
const {addSalesMiddleware} = require('../Middleware/sales/middlewareAddProduct');
const { getAllSalesController } = require('../Controllers/sales/getAllSalesController');
const {getSaleByIdMiddleware} = require('../Middleware/sales/getSaleByIdMiddleware');
const {getSaleByIdController} = require('../Controllers/sales/getSaleByIdController');




app.get('/', (_request, response) => {
  response.send();
});

// Products
app.post('/products', addProductMiddleware , addProduct);
app.get('/products', getAllProductController);
app.get('/products/:id',getByIdMiddleware, getProductByidController);
app.put('/products/:id',updateProductMiddleware, updateProductController );
app.delete('/products/:id', deleteProductMiddleware, deleteProductController);

// Sales

app.post('/sales', addSalesMiddleware , addSale);
app.get('/sales', getAllSalesController);
app.get('/sales/:id',getSaleByIdMiddleware, getSaleByIdController);
// app.put('/sales/:id',updateProductMiddleware, updateProductController );
// app.delete('/sales/:id', deleteProductMiddleware, deleteProductController);

module.exports = app;