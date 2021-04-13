const express = require('express');
const productsRoute = require('./routes/productsRoute');

const app = express();

app.use(express.json());
app.use(productsRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const port = 3000;
app.listen(port, () => { console.log('Rodando...'); });
