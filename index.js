
const express = require('express');
const app = require('express')();

const { ProductRoute } = require('./src/routes');
const { SalesRoute } = require('./src/routes');

const PORT = 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/', ProductRoute);

app.use('/', SalesRoute);


app.listen(PORT, () => console.log('listening'));
