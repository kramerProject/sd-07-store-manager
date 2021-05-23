const models = require('../models/Products');
const { name, quantP, exist, noexist } = require('../middlewares');
const { Router } = require('express');
const OK = '200';
const CREATED = '201';

const productsController = Router();

productsController.get('/', async (_req, res) => {
  const product = await models.getAll();
  res.status(OK).json(product);
});

productsController.post('/', name, quantP, exist, async (req, res) => {
  const { name, quantity } = req.body;
  const product = await models.create(name, quantity);
  res.status(CREATED).json(product.ops[0]);
});

productsController.get('/:id', noexist, async (req, res) => {
  const { id } = req.params;
  const product = await models.getProduct(id);
  res.status(OK).json(product);
});

productsController.delete('/:id', noexist, async (req, res) => {
  const { id } = req.params;
  const product = await models.getProduct(id);
  const response = await models.del(id);
  response.result.ok ? res.status(OK).json(product) : '';
});

productsController.put('/:id', name, quantP, async (req, res) => {
  let result = '';
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await models.update(id, name, quantity);
  product.result.ok ? result = await models.getProduct(id): '';
  res.status(OK).json(result);
});


module.exports = productsController ;