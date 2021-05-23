const { Router } = require('express');
const { validName, validQuant, validExist } = require('../middlewares');
const models = require('../models/products');

const productsController = Router();
const ok = '200';
const create = 201;

productsController.get('/', async (_req, res) => {
  res.status(ok).send( await models.getAll());
});

productsController.post('/', validName, validQuant, validExist, async (req, res) => {
  const { name, quantity } = req.body;
  const product = await models.create(name, quantity);
  res.status(create).send(product.ops[0]);
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


module.exports = productsController;
