const {
  addProduct,
  getAllProducts,
  getById,
  updateById,
  deleteById
} = require('./controller/controllerProducts');

const {
  controllerAddSales
} =require('./controller/controllerSales');


const express = require('express');
const app = express();
const PORT = '3000';
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
//Products
app.get('/products', getAllProducts);
app.post('/products', addProduct);
app.get('/products/:id', getById);
app.put('/products/:id', updateById);
app.delete('/products/:id', deleteById);

//Sales
app.post('/sales', controllerAddSales);

app.listen(PORT, () => { console.log('Online'); });