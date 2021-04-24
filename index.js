const express = require('express');
const productRoute = require('./routes/productRoute');
const salesRoute = require('./routes/salesRoute');
const middlewares = require('./middlewares');

const PORT = 3000;

const app = express();

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
app.use(productRoute);
app.use(salesRoute);

app.use(middlewares.errorMiddleware);

app.listen(PORT, () => {
  console.log('Online');
});
