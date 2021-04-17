const express = require('express');
const bodyParser = require('body-parser');
const productRoute = require('./src/routes/ProductRouter');
const saleRoute = require('./src/routes/SaleRouter');

const app = express();
app.use(bodyParser.json());

app.use(productRoute);
app.use(saleRoute);
const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => { console.log('Online'); });
