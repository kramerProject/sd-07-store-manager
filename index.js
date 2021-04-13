const express = require('express');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const middlewaresValidate = require('./service/serviceValidadeProduct');
const productsRoutes = require('./routes/productsRoute');

app.use(express.json());
app.use(middlewaresValidate);
app.use(productsRoutes);

app.listen(3000, () => {
  console.log(`App ouvindo a porta 3000!`);
});
