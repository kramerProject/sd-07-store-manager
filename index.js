const express = require('express');
const app = express();
const PORT = 3000;
const routes = require('./src/routes/Products');
app.use(express.json());


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.use(routes);

app.listen(PORT, () => {
  console.log(`Bem vindo ao projeto Store Manager rodando na porta ${PORT}`);
});