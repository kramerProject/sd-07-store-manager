const express = require('express');
const { routes } = require('./src/routes');

const app = express();

const PORT =  3333;

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use(routes);

app.listen(process.env.PORT || PORT, () => (console.log('Rodando...')));
