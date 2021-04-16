// não remova esse endpoint, e para o avaliador funcionar

const express = require('express');
const { productRoutes } = require('./src/routes');

const app = express();
const PORT = 3000;

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(productRoutes);

app.listen(PORT, () => {
  console.log('Ouvindo a porta 3000!');
});

