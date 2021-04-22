const express = require('express');
const { productRoutes, salesRoutes } = require('./src/routes');
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(productRoutes);
app.use(salesRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`App rodando na porta ${PORT}`);
});
