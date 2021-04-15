const express = require('express');

const app = express();

const PORT = 3000;
const SUCESS = 200;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCESS).send({
    message: 'PROJETO STORE MANAGER',
  });
});

app.listen(PORT, () => console.log('App rodando na porta ' + PORT));
