const express = require('express');
const bodyParser = require('body-parser');
const { productsController } = require('./src/controller');
const { serverErrCodes } = require('./src/controller/statusCodes');
const { errorMiddleware } = require('./src/middlewares');

const PORT = 3000;

const app = express();

app.use(bodyParser.json());
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(PORT, () => {
  console.log('Listening @ PORT: ', PORT);
});

app.use('/products', productsController);

app.use(errorMiddleware);
