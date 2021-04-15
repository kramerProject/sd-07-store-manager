const express = require('express');
const { produtoRoutes, vendaRoutes } = require ('./src/routes');
const port = '3000';
const app = express();
app.use(express.json());


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(vendaRoutes);
app.use(produtoRoutes);

app.listen(port, () => {
  console.log('Online');
});