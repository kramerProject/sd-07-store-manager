const express = require('express');
const productRoute = require('./src/routes/products');
// const saleRoute = require('./routes/salesRoute');

const app = express();

app.use(express.json());
app.use(productRoute);
// app.use(saleRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const port = 3000;
app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
