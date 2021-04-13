const express = require('express');
const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const product = require('./routes/productsRoute');

app.use('/products', product);

const PORT_NUMBER = 3000;
const PORT = process.env.PORT || PORT_NUMBER;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
