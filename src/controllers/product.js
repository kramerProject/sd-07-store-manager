const models = require('../models/product');
const { Router } = require('express');
const OK = '200';

const productsController = Router();

productsController.get('/', (_req, res) => {
  res.status(OK).send(models.getAll());
});

module.exports = productsController;
