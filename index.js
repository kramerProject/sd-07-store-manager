const express = require('express');
const app = express();
const ProductsRoute = require('./routes/Products');
const SalesRoute = require('./routes/Sales');
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(ProductsRoute);
app.use(SalesRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.info(`Aplicação rodando na porta ${PORT}`);
});