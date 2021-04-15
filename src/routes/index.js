const express = require('express');
const app = express();
const { addProduct } = require('../Controllers/addProductController');
const { addProductMiddleware } = require('../Middleware/middlewareAddProduct');
const { getAllProductController } = require('../Controllers/getAllProductController');
const {getProductByidController} = require('../Controllers/getProductByIdController');
const { getByIdMiddleware } = require('../Middleware/middlewareGetProductById');
const {updateProductMiddleware} = require('../Middleware/middlewareUpdateProduct');
const {updateProductController} = require('../Controllers/updateProductController');
const {deleteProductMiddleware} = require('../Middleware/middlewareDelectProduct');
const {deleteProductController} = require('../Controllers/deleteProductController');

app.get('/', (_request, response) => {
  response.send();
});


app.post('/products', addProductMiddleware , addProduct);

app.get('/products', getAllProductController);

app.get('/products/:id',getByIdMiddleware, getProductByidController);

app.put('/products/:id',updateProductMiddleware, updateProductController );

app.delete('/products/:id', deleteProductMiddleware, deleteProductController);


module.exports = app;