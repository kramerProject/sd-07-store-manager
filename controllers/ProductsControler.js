const { Router } = require('express');
const rescue = require('express-rescue');
const {
  validName,
  validQuantity,
  validId
} = require('../middlewares/validProduct');

const { ProductService, status } = require('../services');

const productRoute = Router();

//  \/ Req. 2 Crie um endpoint para listar os produtos
productRoute.get('/', rescue(async (_req, res) => {
  try {

    const result = await ProductService.getAll();
    return res.status(status.SUCCESS).send(result);

  } catch (err) {

    throw new Error(err);

  }
}));

//  \/ Req. 2 Crie um endpoint para listar os produtos
productRoute.get('/:id', rescue(async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductService.findById(id);

    if (!result) {
      return res.status(status.UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        }
      });
    }

    return res.status(status.SUCCESS).json(result);

  } catch (err) {

    throw new Error(err);

  }
}));

// \/ Req. 1 Crie um endpoint para o cadastro de produtos
productRoute.post('/', validQuantity, rescue(async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const result = await ProductService.create(name, quantity);

    if (result.isError) return next(result);

    return res.status(status.CREATED).json(result);

  } catch (err) {

    throw new Error(err);

  }
}));

productRoute.put('/:id', validId, validQuantity, validName, ProductService.editById);

productRoute.delete('/:id', validId, ProductService.deleteById);

module.exports = productRoute;
