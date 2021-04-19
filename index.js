const express = require('express');
const routes = require('./routes');

const port = 3000;

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(routes.productRoutes);
app.use(routes.saleRoutes);

app.listen(port, () => {
  console.log(`ouvindo a porta ${port}!`);
});
