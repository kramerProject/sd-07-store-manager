const express = require('express');
const productsRoute = require('./src/routes/productsRoute');
const app = express();
const errorMiddlewares = require('./src/middlewares/errorMiddlewares');

app.use(express.json());
app.use(productsRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(errorMiddlewares);

app.listen(3000, () => {
  console.log('Rodando!');
});
