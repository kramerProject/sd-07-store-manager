const express = require('express');

const middlewares = require('./middlewares');
const resources = require('./resources');

const app = express();
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(middlewares.logMiddleware);
app.use(resources.product.route);
app.use(resources.sale.route);
app.use(middlewares.errorMiddleware);

app.listen(PORT, () => {
  console.log(`Store Manager API on ${PORT}!`);
}); 
