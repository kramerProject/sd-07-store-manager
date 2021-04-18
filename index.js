const express = require('express');

const middlewares = require('./src/middlewares');
const routes = require('./src/routes');

const app = express();

const PORT = '3000';
const SUCCESS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(express.json());
app.use(middlewares.logMiddleware);
app.use(routes.productRoutes);
app.use(routes.saleRoutes);

app.use(middlewares.errorMiddleware);

app.listen(PORT, () => {
  console.log('App conectado a porta', PORT);
});
