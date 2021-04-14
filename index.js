const {
  addProduct,
  getAllProducts,
  getById
} = require('./controller/controllerProducts');
const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const PORT = '3000';
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', getAllProducts);
app.post('/products', addProduct);
app.get('/products/:id', getById);

app.listen(PORT, () => { console.log('Online'); });