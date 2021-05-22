const sale = require('../models/sale');
const { Router } = require('express');
const { saleValidation } = require('../middlewares/sale/validation');

const salesController = Router();

const OK = 200;

salesController.post('/', saleValidation, async (req, res) => {
  const soldProducts = await sale.create(req.body);
  res.status(OK).send(soldProducts.ops[0]);
});

module.exports = salesController;
