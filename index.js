const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const dbProject = require('./models/dbProject');
const validationsProducts = require('./middleWare/validationsProducts');
const search = require('./models/search');
const Status = {
  OK: 200,
  Created: 201,
  Unprocessable_Entity: 422,
};
const port = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', search.getById);

app.get('/products', search.getAll);

app.post('/products', validationsProducts, async (req, res) => {
  const { name, quantity } = req.body;
  const produzei = await dbProject.insert(name, quantity);
  return res.status(Status.Created).json(produzei);
});

app.listen(port, () => {
  console.log(`Example app listening on port 3000! - ${Date()}`);
});
