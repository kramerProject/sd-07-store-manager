const express = require('express');

const app = express();
const PORT_URL = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const productsRoutes = require('./routes/productsRoute');
const salesRoutes = require('./routes/salesRoute');

app.use(express.json());
app.use(productsRoutes);
app.use(salesRoutes);

app.listen(PORT_URL, () => {
  console.log(`App ouvindo a porta ${PORT_URL}`);
});
