
const express = require('express');
const routes = require('./src/routes');


const app = express();

app.use(express.json());
app.use(routes.productsRoute);
app.use(routes.salesRoute);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening on ${PORT} `);
});





// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
