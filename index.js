const express = require('express');
const route = require('./routes');

const app = express();
const PORT = 3000;

app.use(express.json());
// não remova esse endpoint, e para o avaliador funcionar

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', route.productController);
app.use('/sales', route.salesController);

app.listen(PORT, console.log(`App listening on port ${PORT}`));