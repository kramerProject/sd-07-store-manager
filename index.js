const express = require('express');
const app = express();
const ProductsRoute = require('./routes/Products');
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(ProductsRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.info(`Aplicação rodando na porta ${PORT}`);
});