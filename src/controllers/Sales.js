const models = require('../models/Sales');
const { quantS } = require('../middlewares');
const { Router } = require('express');
const OK = '200';
const CREATED = '201';

const salesController = Router();

salesController.post('/', quantS, async (req, res) => {
  const { itensSold } = req.body;
  const product = await models.create(itensSold);
  res.status(CREATED).json(product.ops[0]);
});

module.exports = salesController;