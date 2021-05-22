const models = require('../models/Products');
const { Router } = require('express');
const OK = '200';
const CREATED = '201';

const productsController = Router();

productsController.get('/', async (_req, res) => {
  const product = await models.getAll();
  res.status(OK).json(product);
});

productsController.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  const product = await models.create({ name, quantity });
  res.status(CREATED).json(product.ops[0]);
});

module.exports = productsController ;