const express = require('express');
const app = express();
const productsController = require('./src/controllers/product');
const salesController = require('./src/controllers/sale');

const PORT = '3000';

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);
app.use('/sales', salesController);

app.listen(PORT, () => { console.log(`Online at localhost:${PORT}`); });
