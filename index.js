const express = require('express');
const app = express();
const productsRoute = require('./routes/products');
const salesRoute = require('./routes/sales');

app.use(express.json());

const PORT = 3000;

app.use(productsRoute);
app.use(salesRoute);


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen( PORT, () => {
  console.log(`listening on port ${PORT}`);
});
