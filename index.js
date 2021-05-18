const express = require('express');
const { productsRoute, salesRoute } = require('./routes');
const app = express();

app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productsRoute);
app.use(salesRoute);

app.listen( PORT, () => {
  console.log(`listening on port ${PORT}`);
});
