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

salesRoute.get('/:id', rescue( async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SalesService.findById(id);

    if (!result) {
      return res.status(status.NOT_FOUND).json({
        err: {
          code: 'not_found',
          message: 'Sale not found',
        }
      });
    }


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

    return res.status(status.SUCCESS).json(result);

  } catch (err) {
    console.log(err);
    throw new Error(err);

  }
}));

salesRoute.put('/:id', rescue( async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = req.body;

    const result = await SalesService.editById( id, product);

    if (result.isError) return next(result);

    return res.status(status.SUCCESS).json(result);

  } catch (err) {
    console.log(err);
    throw new Error(err);

  }
}));

salesRoute.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SalesService.findById( id );

    if (!result) {
      return res.status(status.UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format',
        }
      });
    }

    const deletList = await SalesService.exluce(id);
    return res.status(status.SUCCESS).json(deletList);


  } catch (err) {
    console.log(err);
    throw new Error(err);

  }
});



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
