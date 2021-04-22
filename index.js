const express = require('express');
const productsRoute = require('./src/routes/productsRoute');
const salesRoute = require('./src/routes/salesRoute');
const errorMiddlewares = require('./src/middlewares/errorMiddlewares');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(productsRoute);
app.use(salesRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(errorMiddlewares);

app.listen(PORT, () => {
  console.log('Rodando!');
});
