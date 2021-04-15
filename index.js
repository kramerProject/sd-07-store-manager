const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(routes.productRoutes, routes.saleRoutes);

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
