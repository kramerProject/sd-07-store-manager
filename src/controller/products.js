const { Router } = require('express');
const models = require('../models/products');

const productsController = Router();
const ok = '200';
const create = 201;

productsController.get('/', async (_req, res) => {
  res.status(ok).send( await models.getAll());
});

productsController.post('/', async (req, res) => {
  const { name,quantity } = req.body;
  const product = await models.create(name, quantity);
  res.status(create).send(product.ops[0]);
});

module.exports = productsController;
