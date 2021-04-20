const express = require('express');

const app = express();

app.use(express.json());

const  productController = require('./controllers/productController');
const  saleController = require('./controllers/saleController');

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/', productController);
app.use('/', saleController);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
