const express = require('express');
const app = express();
const productController = require('./controllers/productController');

const PRODUCT_BASE_URL = '/products';
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post(PRODUCT_BASE_URL, productController.createProduct);

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
