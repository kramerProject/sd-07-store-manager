const express = require('express');
const productRoute = require('./routes/productRoute');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(productRoute);

const porta = 3000;
const PORT = process.env.PORT || porta;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
