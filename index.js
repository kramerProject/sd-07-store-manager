const express = require('express');
const productRoutes = require('./routes/productsRoutes');

const app = express();

app.use(express.json());
app.use(productRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const port = 3000;
app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
