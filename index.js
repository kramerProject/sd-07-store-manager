const express = require('express');
const routes = require('./routes');
const { errorMiddleware } = require('./middlewares');

const PORT = 3000;
const app = express();
app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.use(routes.productsRoute);
app.use(errorMiddleware);
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
