const models = require('../models/product');
const { Router } = require('express');
const { 
  nameValidation,
  quantityValidation 
} = require('../middlewares/product/validation');
// const productValidation = require('../src/middlewares/product/validation');

const OK = 200;
const CREATED = 201;

const productsController = Router();

productsController.get('/', async (_req, res) => {
  res.status(OK).send(await models.getAll());
});

productsController.post('/', nameValidation, quantityValidation, async (req, res) => {
  const { name, quantity } = req.body;
  const product = await models.create(name, quantity);
  res.status(CREATED).send(product.ops[0]);
}

);

module.exports = productsController;
