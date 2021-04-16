const Joi = require('joi');
const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const SUCCESS = 201;
const OK = 200;

const addSales = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    productId: Joi.string().not().empty().required(),
    quantity: Joi.not().empty().required(),
  }).validate(req.body[0]);
  if (error) return next(error);

  const sales = await salesService.addSales(req.body);
  if (sales.err) return next(sales.err);

  res.status(OK).json(sales);
});

module.exports = { addSales };
