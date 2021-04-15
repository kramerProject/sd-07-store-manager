const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const validators = require('./models/validators');
const validationsProducts = require('./middleWare/validationsProducts');
const search = require('./models/search');
const change = require('./models/change');
const remove = require('./models/remove');
const sales = require('./models/sales');
const Status = require('./middleWare/Status');
const port = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/:id', search.getById);

app.put(
  '/products/:id',
  validationsProducts[0],
  validationsProducts[2],
  validationsProducts[3],
  change,
);

app.delete('/products/:id', remove);

app.get('/products', search.getAll);

app.put('/sales/:id',
  sales.updateSalesId);

app.get('/sales/:id', sales.salesListId);

app.get('/sales', sales.salesList);

app.post('/products', validationsProducts, async (req, res) => {
  const { name, quantity } = req.body;
  const produzei = await validators.insert(name, quantity);
  return res.status(Status.Created).json(produzei);
});

app.post('/sales', sales.salesCreate);

app.delete('/sales/:id', sales.deleteSalesId);

app.listen(port, () => {
  console.log(`Example app listening on port 3000! - ${Date()}`);
});
