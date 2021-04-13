const express = require('express');
const bodyParser = require('body-parser');
const { verifyName, verifyQuantity, verifyExists } = require('./middleware/verify');
const products = require('./controllers/productController');
const port = 3000;
const app = express();

app.use(express.json());

db = require('./db');

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', products.show );
app.post('/products', verifyName, verifyQuantity, products.create );

app.get('/products/:id', verifyExists, products.showOne );
app.put('/products/:id', verifyQuantity, verifyName, verifyExists, products.updateOne  );
app.delete('/products/:id', verifyExists, products.deleteOne);


app.listen(port, () => console.log('App listening on port 3000!'));
