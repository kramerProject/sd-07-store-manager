const express = require('express');
const {
  checkProductInsertion,
  errorMiddleware,
  checkProductUpdate,
  checkProductId,
} = require('./middleware');
const {
  insertProduct,
  getAllProducts,
  getProductByID,
  updateProduct,
  deleteProduct,
} = require('./models/products');

const app = express();

const OK = 200;
const CREATED = 201;
const INTERNAL_ERROR = 500;

app.get('/products', async (_request, response) => {
  try {
    const result = await getAllProducts();
    response.status(OK).send(result);
  } catch(err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.get('/products/:id', checkProductId, async (request, response) => {
  const { id } = request.params;

  try {
    const result = await getProductByID(id);
    response.status(OK).send(result);
  } catch(err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.post('/products', checkProductInsertion, async (request, response) => {
  const { name, quantity } = request.body;

  try {
    const result = await insertProduct({ name, quantity });
    response.status(CREATED).send(result);
  } catch(err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.put('/products/:id', checkProductUpdate, async (request, response) => {
  const { id } = request.params;
  const product = request.body;

  try {
    const result = await updateProduct(id, product);
    response.status(OK).send(result);
  } catch(err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.delete('/products/:id', checkProductId, async (request, response) => {
  const { id } = request.params;

  try {
    const result = await deleteProduct(id);
    response.status(OK).send(result);
  } catch(err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.use(errorMiddleware);

module.exports = app;
