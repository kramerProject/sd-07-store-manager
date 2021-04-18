const express = require('express');
const productRoutes = require('./router/productsRouters');
const saleRoutes = require('./router/salesRouters');

const app = express();
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoutes);
app.use('/sales', saleRoutes);

app.listen(PORT, console.log(`App listening on port ${PORT}`));