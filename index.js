const express = require('express');
const app = express();
const Products = require('./Controllers/Products');

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', Products.create);
app.get('/products', Products.getProduct);
app.get('/products/:id', Products.getByProductId);

const PORT = 3000;
app.listen(PORT, () => {
  console.info(`Aplicação rodando na porta ${PORT}`);
});