const express = require('express');
const routesProducts = require('./routes/routesProducts');
const routesSales = require('./routes/routesSales');

const app = express();
const server = 3000;
app.use(express.json());

app.use(routesProducts, routesSales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(server, () => {
  console.log('Running on port: 3000!');
});
