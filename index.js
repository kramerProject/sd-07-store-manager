const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const salesController = require('./controllers/salesController');

const app = express();

app.use(express.json());
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productController);
app.use('/sales', salesController);

app.listen( PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
