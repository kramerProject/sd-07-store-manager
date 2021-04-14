
const express = require('express');
const app = require('express')();

const { ProductRoute } = require('./routes');
const { SalesRoute } = require('./routes');

const PORT = 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/', ProductRoute);

app.use('/', SalesRoute);


app.listen(PORT, () => console.log('listening'));
