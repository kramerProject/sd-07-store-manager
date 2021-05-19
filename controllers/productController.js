const { productService } = require('../services');
const { httpStatus, errorResponse } = require('../utils');
const rescue = require('express-rescue');

const getAll = rescue(async (_request, response) => {
  const products = await productService.getAll();
  response.status(httpStatus.SUCCESS).send(products);
});

const create = rescue(async (request, response) => {
  const { name, quantity } = request.body;
  const result = await productService.create({ name, quantity });
  response.status(httpStatus.CREATED).send(result);
});

const errorMiddleware = (err, _req, response, _next) => {
  response.status(httpStatus.UNPROCESSABLE_ENTITY)
    .json(errorResponse.INVALID_DATA(err.message));
  
};

module.exports = { getAll, create, errorMiddleware };
