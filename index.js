const express = require('express');
const productRoute = require('./Products/productRoutes');
const saleRoute = require('./Sales/saleRoutes');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(productRoute);
app.use(saleRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Ouvindo porta ${PORT}!`));
