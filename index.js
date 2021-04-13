const express = require('express');
require('dotenv').config();
const { productsRoute, salesRoute } = require('./routes');
const { errorMiddleware } = require('./middleware');

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(productsRoute);
app.use(salesRoute);
app.use(errorMiddleware);

app.listen(PORT, () => { console.log('Online'); });
