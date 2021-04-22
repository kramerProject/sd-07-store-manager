const express = require('express');
const app = express();
const routeSales = require('./routes/sales');
const routeProduct = require('./routes/products');
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
// app.use(routeSales);
app.use(routeProduct);
app.use(routeSales);
const PORT = 3000;
app.listen(PORT,() => console.log('Minha aplicação está rodando!!'));
