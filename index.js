const express = require('express');
const productsRoute = require('./routes/productsRoute');
const salesRoute = require('./routes/salesRoute');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funciona
app.get('/', (_request, response) => {
  response.send();
});

app.use(productsRoute);
app.use(salesRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`App ouvindo na porta ${port}`);
});