// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const productsController = require('./src/controllers/Products');
const salesController = require('./src/controllers/Sales');
const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsController);
app.use('/sales', salesController);

app.listen('3000', () => console.log('Rodando..'));
