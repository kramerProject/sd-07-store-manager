const express = require('express');
const bodyParser = require('body-parser');

const products = require('./controllers/ProductsController');
const sales = require('./controllers/SalesController');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.route('/products')
  .get(products.getAll)
  .post(products.create) // requirement 1 - OK

app.route('/products/:id')
.get(products.findById)
.put(products.updateById)
.delete(products.deleteById);

app.route('/sales')
  .get(sales.getAll)
  .post(sales.create);

app.route('/sales/:id')
  .get(sales.findById)
  .put(sales.updateById)
  .delete(sales.deleteById);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Servidor Online na porta ${PORT}`));
