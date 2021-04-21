require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const { productsRoute, salesRoute } = require('./routes');
const errorMiddleware = require('./middlewares/error.js');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productsRoute);
app.use(salesRoute);

app.use(errorMiddleware);


const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
