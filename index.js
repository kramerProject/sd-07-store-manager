const express = require('express');
const bodyParser = require('body-parser');
const productRouter = require ('./controllers/productController');
const saleRouter = require('./controllers/saleController');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouter);
app.use('/sales', saleRouter);

app.listen(PORT, () => {
  console.log(`App ouvindo a porta ${PORT}!`);
});
