const { Router } = require('express');
const rescue = require('express-rescue');

const { SalesService, status } = require('../services');

const salesRoute = Router();

salesRoute.get('/', rescue( async (_req, res) => {
  try {
    const result = await SalesService.getAll();

    res.status(status.SUCCESS).json(result);
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}));

salesRoute.post('/', rescue( async (req, res, next) => {
  try {
    const product = req.body;

    const result = await SalesService.create(product);

    if (result.isError) return next(result);

    return res.status(status.CREATED).json(result);

  } catch (err) {
    console.log(err);
    throw new Error(err);

  }
}));



/*
productRoute.post('/', rescue(async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const result = await ProductService.create(name, quantity);

    if (result.isError) return next(result);

    return res.status(status.CREATED).json(result);

  } catch (err) {

    throw new Error(err);

  }
}));
*/

module.exports = salesRoute;
