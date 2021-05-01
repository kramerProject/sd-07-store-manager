const express = require('express');
const { routeProduct, routeSale } = require('./src/routes');

const app = express();

app.use(express.json());

const PORT = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});


app.use(routeProduct);
app.use(routeSale);

app.listen(PORT, () => {
  console.log('Online!');
});
