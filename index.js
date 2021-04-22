const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

const Products = require('./controller/products');
const Sales = require('./controller/sales');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', Products.createProduct);
app.get('/products', Products.getAllProducts);
app.get('/products/:id', Products.getProductById);
app.put('/products/:id', Products.updateProduct);
app.delete('/products/:id', Products.deleteProduct);

app.post('/sales', Sales.createSale);
app.get('/sales', Sales.getAllSales);
app.get('/sales/:id', Sales.getSaleById);
app.put('/sales/:id', Sales.updateSale);
app.delete('/sales/:id', Sales.deleteSale);


app.listen(PORT, () => {
  console.log('App rodando na porta 3000');
});
