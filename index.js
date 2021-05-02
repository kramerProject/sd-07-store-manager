const express = require('express');
const productsRoute = require('./routes/products');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/products', productsRoute);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => { response.send(); });

app.listen(PORT, () => {
  console.log(`Online at port ${PORT}`);
});
