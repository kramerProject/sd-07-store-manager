const express = require('express');

const app = express();

const PORT =  3333;

app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT || PORT, () => (console.log('Rodando...')));
