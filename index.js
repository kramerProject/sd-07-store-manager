const {
  addProduct,
  getAllProducts,
  getById,
  updateById,
  deleteById
} = require('./controller/controllerProducts');

const {
  controllerAddSales,
  getAllSales,
  getSalesById,
  updateSalesById,
  deleteSalesById
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
app.get('/sales', getAllSales);
app.get('/sales/:id', getSalesById);
app.put('/sales/:salesId', updateSalesById);
app.delete('/sales/:id', deleteSalesById);

app.listen(PORT, () => { console.log('Online'); });