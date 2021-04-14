const express = require('express');
const bodyParser = require('body-parser');
const verifyProduct = require('./middleware/verifyProduct');
const verifySales = require('./middleware/verifySales');
const products = require('./controllers/productController');
const sales = require('./controllers/saleController');
const port = 3000;
const app = express();

app.use(express.json());

db = require('./db');

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', products.show );
app.post('/products',
  verifyProduct.verifyName,
  verifyProduct.verifyQuantity, products.create );

app.get('/products/:id', verifyProduct.verifyExists, products.showOne );
app.put('/products/:id', 
  verifyProduct.verifyQuantity, 
  verifyProduct.verifyName, verifyProduct.verifyExists, products.updateOne  );
app.delete('/products/:id', verifyProduct.verifyExists, products.deleteOne);

app.post('/sales', verifySales.verifyQuantity, sales.create);

app.listen(port, () => console.log('App listening on port 3000!'));
