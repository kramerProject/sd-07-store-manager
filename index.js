const express = require('express');
const ProductRoutes = require('./Routes/ProductRoutes');
const SalesRoutes = require('./Routes/SalesRoutes');

// não remova esse endpoint, e para o avaliador funcionar

const app = express();
const server = 3000;
app.use(express.json());

app.use(ProductRoutes, SalesRoutes);
app.get('/', (_request, response) => {
  response.send();
});


app.listen(server, () => {
  console.log(`App ouvindo na porta ${server}`);
});
