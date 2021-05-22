const sale = require('../models/sale');
const { Router } = require('express');
// const { saleValidation } = require('../middlewares/sale/validation');

const salesController = Router();

const OK = 200;
const INVALID_DATA = 422;
const NOT_FOUND = 404;
const WRONG_ID_FORMAT = {
  err: {
    code: 'invalid_data',
    message: 'Wrong id format'
  }
};
const ERROR_NOT_FOUND = {
  err: {
    code: 'not_found',
    message: 'Sale not found'
  }
};

salesController.get('/', async (_req, res) => {
  res.status(OK).send(
    {
      sales: await sale.getAll()
    }
  );
});

salesController.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await sale.getOne(id);
    if (item === null) return res.status(NOT_FOUND).send(ERROR_NOT_FOUND);
    return res.status(OK).send(item);
  } catch(err) {
    console.log(err);
    return res.status(NOT_FOUND).send(ERROR_NOT_FOUND);
  }
});

salesController.post('/', async (req, res) => {
  const soldProducts = await sale.create(req.body);
  res.status(OK).send(soldProducts.ops[0]);
});

module.exports = salesController;
