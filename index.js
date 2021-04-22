const express = require('express');
const routes = require('./routes');

const app = express();

const PORTA = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(routes.productsRoutes);
app.use(routes.salesRoutes);

app.listen(PORTA, () => console.log(`App ouvindo a porta ${PORTA}!`));
