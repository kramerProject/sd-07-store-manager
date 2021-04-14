const express = require('express');
const bodyParser = require('body-parser');
const products = require('./routers/products');
const { sendError } = require('./configs/erro');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);

app.listen(PORT);
