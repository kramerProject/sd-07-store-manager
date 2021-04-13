const express = require('express');
const controllerProducts = require('./controllerProducts');

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// app.post('/products', controllerProducts.addProduct);
