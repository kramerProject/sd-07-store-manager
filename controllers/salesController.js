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

const getAllSales = async (_req, res) => {
  const resultSales = await salesService.getAllSales();
  res.status(OK).json(resultSales);
};

const findByIdSales = rescue(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const salesId = await salesService.findByIdSales(id);
  if (salesId.err) return next(salesId.err);
  res.status(OK).json(salesId);
});

module.exports = { addSales, getAllSales, findByIdSales };
