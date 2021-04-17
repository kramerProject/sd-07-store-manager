const express = require('express');
const logMiddleware = require('./middlewares');
const { productsRoutes } = require('./routes');
const STATUS_CODE = require('./helper');

const PORT = 3000;
const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(logMiddleware);
app.use(productsRoutes);

app.listen(PORT, () => {
  console.log('I\'m playing the game...');
});
