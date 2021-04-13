const { Router } = require('express');
const express = require('express');
const router = require('./routes/routes');

const app = express();
const number = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(router);

app.listen(number, () => {
  console.log(`App ouvindo a porta 3000!`);
});
