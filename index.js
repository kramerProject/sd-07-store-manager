const express = require('express');
const routes = require('./src/routes');

const PORT = '3000';
const app = express();

app.use(express.json());

app.use(routes.productsRoutes);
app.use(routes.salesRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}!`);
});