const express = require('express');
const app = express();
const productsController = require('./src/controllers/product');

const PORT = '3000';

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);

app.listen(PORT, () => { console.log(`Online at localhost:${PORT}`); });
