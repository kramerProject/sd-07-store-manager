const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes.productRoutes);
app.use(routes.saleRoutes);

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});
