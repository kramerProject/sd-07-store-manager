const express = require('express');
const app = express();
const productRoutes = require('./src/routes/products');

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/products', productRoutes);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('entrou');
});

