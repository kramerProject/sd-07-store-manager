const {
  addProduct,
  getAllProducts,
  getById,
  updateById,
  deleteById
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
app.put('/products/:id', updateById);
app.delete('/products/:id', deleteById);

app.listen(PORT, () => { console.log('Online'); });