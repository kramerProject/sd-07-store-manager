const sale = require('../models/sale');
const { Router } = require('express');

const salesController = Router();

const OK = 200;

salesController.post('/', async (req, res) => {
  const soldProducts = await sale.create(req.body);
  res.status(OK).send(soldProducts.ops[0]);
});

module.exports = salesController;
