const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require('./src/routes/productRouter');
const saleRouter = require('./src/routes/saleRouter');
const { sendError } = require('./src/util/errorHandler');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);
app.use('/sales', saleRouter);
app.use((err, _req, res, _next) => {
  sendError(err, res);
});

app.listen(PORT, () => {
  console.log(`connected to the port ${PORT}`);
});
