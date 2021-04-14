const express = require('express');
const products = require('./routes/productRoute');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(products);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log(`Na porta: ${PORT}`);
});