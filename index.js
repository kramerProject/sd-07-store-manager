const express = require('express');

const app = express();
const routes = require('./routes');
const { errorHandlerMiddleware } = require('./middlewares');
const SERVER_PORT = 3000;

app.use(express.json());
app.use(routes);

app.use(errorHandlerMiddleware);
app.listen(SERVER_PORT, () => {
  console.log(`Online na porta ${SERVER_PORT}!`);
});


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
