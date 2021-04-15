const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const { productsController } = require('./src/controller');
const { serverErrCodes } = require('./src/controller/statusCodes');

const app = express();

if (!dotenv) {
  throw new Error({
    message: 'Missing env config',
    status: serverErrCodes['Internal Server Error'],
  });
}

app.use(bodyParser.json());
app.use('/products', productsController);

app.listen(process.env.PORT, () => {
  console.log('Risso @ PORT: ', process.env.PORT);
});
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});


