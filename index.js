const express = require('express');
const productRouters = require('./src/routes/productRoutes');
const saleRouters = require('./src/routes/saleRoutes');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/products', productRouters);
app.use('/sales', saleRouters);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Servidor iniciado');
});
