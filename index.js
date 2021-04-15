const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

const routesProducts = require('./routes/products');

const routesSales = require('./routes/sales');

const mid = require('./middlewares/index');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', routesProducts);

app.use('/sales', routesSales);

app.use(mid.errorMiddleware);

app.listen(port, () => {
  console.log(`Running on port: ${port}!!!`);
});
