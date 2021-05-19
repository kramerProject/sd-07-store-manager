const { productService } = require('../services');
const { httpStatus, errorResponse } = require('../utils');
const rescue = require('express-rescue');

const getAll = rescue(async (_request, response) => {
  const products = await productService.getAll();
  response.status(httpStatus.SUCCESS).json(products);
});

const create = rescue(async (request, response) => {
  const { name, quantity } = request.body;
  const result = await productService.create({ name, quantity });
  response.status(httpStatus.CREATED).send(result);
});

const update = rescue(async (request, response) => {
  const { id } = request.params;
  const { name, quantity } = request.body;
  const result = await productService.update({ id, name, quantity });
  response.status(httpStatus.SUCCESS).send(result);
});

const getById = rescue(async (request, response) => {
  const { id } = request.params;
  const result = await productService.getById(id);
  response.status(httpStatus.SUCCESS).send(result);
});

const errorMiddleware = (err, _req, response, _next) => {
  response.status(httpStatus.UNPROCESSABLE_ENTITY)
    .json(errorResponse.INVALID_DATA(err.message));
  
};

module.exports = { getById, getAll, create, update, errorMiddleware };
