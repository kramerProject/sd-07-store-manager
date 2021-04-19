const express = require('express');
const { routeProduct, routerSales } = require('./routes');
const { errorMiddlewares } = require('./middlewares');

const app = express();

const SUCESS = 200;
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCESS).send();
});

app.use(routeProduct);
app.use(routerSales);

app.use(errorMiddlewares);

app.listen(PORT, () => console.log('Online'));
