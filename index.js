const express = require('express');
const { productsRouter, salesRouter } = require('./routers');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo porta ${PORT}`);
});
