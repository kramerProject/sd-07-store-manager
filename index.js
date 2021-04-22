// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const products = require('./src/routes/productsRoute');
const sales = require('./src/routes/salesRoute');
const app = express();

app.use(express.json());
app.use('/products', products);
app.use('/sales', sales);

app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
