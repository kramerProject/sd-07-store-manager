const express = require('express');
const bodyParser = require('body-parser');
const productRoute = require('./routes/productRoute');
const saleRoute = require('./routes/saleRoute');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productRoute);
app.use(saleRoute);

const portNumber = 3000;
const PORT = process.env.PORT || portNumber;
app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
