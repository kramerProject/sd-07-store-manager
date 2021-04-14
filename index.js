const express = require('express');
const productsRoute = require('./routes/productsRoute');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funciona
app.get('/', (_request, response) => {
  response.send();
});

app.use(productsRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`App ouvindo na porta ${port}`);
});