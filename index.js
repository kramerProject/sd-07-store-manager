const express = require('express');
const productRoute = require('./productRoutes');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(productRoute);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Ouvindo porta ${PORT}!`));
