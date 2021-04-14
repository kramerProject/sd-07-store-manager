const express = require('express');
const app = express();
const { addProduct } = require('../Controllers/addProductController');
const { addProductMiddleware } = require('../Middleware/middlewareAddProduct');

app.get('/', (_request, response) => {
  response.send();
});


app.post('/products', addProductMiddleware , addProduct);


module.exports = app;