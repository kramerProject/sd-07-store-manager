// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const routes = require('./routes');
const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use(routes);

app.listen(PORT, () => {
  console.log('...loaded');
});
