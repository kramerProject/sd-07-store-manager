const express = require('express');
const routes = require('./router/productsRouters');

const app = express(); 
const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routes);
// app.use('/sales', route.salesController);

app.listen(PORT, console.log(`App listening on port ${PORT}`));