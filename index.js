//Projeto do Virgílio

const express = require('express');
const productRouter = require('./routers/routerProduct');
const salesRouter = require('./routers/routerSale');


const app = express();
app.use(express.json());

const PORT = '3000';

app.use('/', productRouter);
app.use('/', salesRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Online');
});
