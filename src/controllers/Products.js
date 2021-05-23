const models = require('../models/Products');
const { name, quant, exist } = require('../middlewares');
const { Router } = require('express');
const OK = '200';
const CREATED = '201';

const productsController = Router();

productsController.get('/', async (_req, res) => {
  const product = await models.getAll();
  res.status(OK).json(product);
});

productsController.post('/', name, quant, exist, async (req, res) => {
  const { name, quantity } = req.body;
  const product = await models.create(name, quantity);
  res.status(CREATED).json(product.ops[0]);
});

productsController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await models.getProduct(id);
  res.status(OK).json(product);
});

productsController.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await models.getProduct(id);
  const response = await models.del(id);
  response.result.ok ? res.status(OK).json(product) : '';
});

productsController.put('/:id', async (req, res) => {
  let result = '';
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await models.update(id, name, quantity);
  product.result.ok ? result = await models.getProduct(id): '';
  res.status(OK).json(result);
});


module.exports = productsController ;