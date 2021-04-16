const express = require('express');
const productsRouter = require('./src/routers/productsRouter');
const salesRouter = require('./src/routers/salesRouter');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productsRouter);
app.use(salesRouter);

app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
