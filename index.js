const express = require('express');
const products = require('./src/controller/productsController');
const sales = require('./src/controller/salesController');
const { checkProducts, checkDuplicate } = require('./src/service/productsService');
const { checkSale } = require('./src/service/saleService');
const { buyJudge, deleteJudge } = require('./src/service/midJudge');

const app = express();
const PORT = 3000;

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar
app.put('/products/:id', checkProducts, products.editById);
app.post('/products', checkProducts, checkDuplicate, products.create);
app.delete('/products/:id', products.deleteById);
app.get('/products/:id', products.getById);
app.get('/products', products.getAll);

app.post('/sales', checkSale, buyJudge, sales.create);
app.get('/sales/:id', sales.getById);
app.get('/sales', sales.getAll);
app.put('/sales/:id', checkSale, sales.editById);
app.delete('/sales/:id', deleteJudge, sales.deleteById);
// app.delete('/sales/:id', fuck, deleteJudge, sales.deleteById);

app.get('/', async (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));