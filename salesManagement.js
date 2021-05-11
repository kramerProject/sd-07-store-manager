const express = require('express');
const {
  checkNewSale,
  errorMiddleware,
  checkSaleId,
  checkSaleUpdate,
  checkDeleteSale,
} = require('./middleware');
const {
  getAllSales,
  createSale,
  getSaleById,
  updateSale,
  deleteSale,
} = require('./models/sales');

const app = express();

const OK = 200;
const CREATED = 201;
const INTERNAL_ERROR = 500;

app.get('/sales', async (_request, response) => {
  try {
    const result = await getAllSales();
    response.status(OK).send({ sales: result });
  } catch(err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.get('/sales/:id', checkSaleId, async (request, response) => {
  const { id } = request.params;
  
  try {
    const result = await getSaleById(id);
    response.status(OK).send(result);
  } catch(err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.post('/sales', checkNewSale, async (request, response) => {
  const productsArray = request.body;

  try {
    const result = await createSale(productsArray);
    response.status(OK).send(result);
  } catch(err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.put('/sales/:id', checkSaleUpdate, async (request, response) => {
  const { id } = request.params;

  try {
    const result = await updateSale(id, request.body);
    response.status(OK).send(result);
  } catch(err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.delete('/sales/:id', checkDeleteSale, async (request, response, next) => {
  const { id } = request.params;

  try {
    const result = await deleteSale(id);
    response.status(OK).send(result);
  } catch(err) {
    response.status(INTERNAL_ERROR).send({ message: err.message });
  }
});

app.use(errorMiddleware);

module.exports = app;