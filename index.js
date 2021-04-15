const express = require('express');
const productController = require('./controllers/ProductController');

const app = express();

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productController);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
