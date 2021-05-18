const express = require('express');
const app = express();
const productRoutes = require('./src/routes/products');
const salesRoutes = require('./src/routes/sales');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(productRoutes);
app.use(salesRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Rodando na porta :${PORT}`);
});

