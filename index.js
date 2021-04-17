const express = require('express');
const { productRoutes } = require('./src/routes');

const app = express();
const PORT = 3000;

// Products
app.use(express.json());
app.use(productRoutes);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`App ouvindo a porta ${PORT}`);
});
