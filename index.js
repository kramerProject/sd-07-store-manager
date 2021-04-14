const express = require('express');
const productRouter = require('./src/routers/product');
const saleRouter = require('./src/routers/sale');
const { sendError } = require('./src/configs/erro');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);
app.use('/sales', saleRouter);
app.use((err, _req, res, _next) => {
  sendError(err, res);
});

app.listen(PORT);
