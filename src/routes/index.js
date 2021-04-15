const express = require('express');
const app = express();
const { addProduct } = require('../Controllers/addProductController');
const { addProductMiddleware } = require('../Middleware/middlewareAddProduct');
const { getAllProductController } = require('../Controllers/getAllProductController');
const {getProductByidController} = require('../Controllers/getProductByIdController');
const { getByIdMiddleware } = require('../Middleware/middlewareGetProductById');

app.get('/', (_request, response) => {
  response.send();
});


app.post('/products', addProductMiddleware , addProduct);

app.get('/products', getAllProductController);

app.get('/products/:id',getByIdMiddleware, getProductByidController);


module.exports = app;