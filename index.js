const express = require('express');
const productRoutes = require('./Routes/productRoutes');
const salesRoutes = require('./Routes/salesRoutes');

const app = express();


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const port = 3000;
app.use(express.json());
app.use(productRoutes);
app.use(salesRoutes);
app.listen(port, () => {
  console.log('App ouvindo a porta 3000!');
}); 