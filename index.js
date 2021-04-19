const express = require('express');
const { routeProduct, routerSales } = require('./routes');
const { errorMiddlewares } = require('./middlewares');
const { SUCCESS, PORT } = require('./CODE_ERROR');

const app = express();

const routes = [routeProduct, routerSales];

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCCESS).send();
});

app.use(routes);

app.use(errorMiddlewares);

app.listen(PORT, () => console.log('Online'));
