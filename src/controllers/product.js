const product = require('../models/product');
const { Router } = require('express');
const { 
  nameValidation,
  nameAlreadyExists,
  quantityValidation 
} = require('../middlewares/product/validation');

const OK = 200;
const CREATED = 201;
const INVALID_DATA = 422;

const productsController = Router();

productsController.get('/', async (_req, res) => {
  res.status(OK).send(
    {
      products: await product.getAll()
    }
  );
});

productsController.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await product.getOne(id);
    res.status(OK).send(item);
  } catch {
    res.status(INVALID_DATA).send(
      {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }
      }
    );
  }
});

productsController
  .post('/', nameAlreadyExists, nameValidation, quantityValidation, async (req, res) => {
    const { name, quantity } = req.body;
    const item = await product.create(name, quantity);
    res.status(CREATED).send(item.ops[0]);
  });

productsController
  .put('/:id', nameValidation, quantityValidation, async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const item = await product.update(id, name, quantity);
    res.status(OK).send(item);
  });

module.exports = productsController;
