const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

const products = require('./controllers/products');
const sales = require('./controllers/sales');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', products.getProducts);

app.get('/products/:id', products.getProductById);

app.post('/products', products.registerProduct);

app.put('/products/:id', products.updateProduct);

app.delete('/products/:id', products.deleteProduct);

app.post('/sales', sales.registerSales);

app.get('/sales', sales.getSales);

app.get('/sales/:id', sales.getSaleById);

app.delete('/sales/:id', sales.deleteSale);

app.put('/sales/:id', sales.updateSales);

app.listen(port, () => console.log('listening on port 3000'));