const express = require('express');
const productsRouter = require('./src/routers/productsRouter');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productsRouter);

app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));
