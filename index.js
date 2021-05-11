const express = require('express');
const stockManagement = require('./stockManagement');
const salesManagement = require('./salesManagement');

const app = express();

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use(stockManagement);
app.use(salesManagement);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
