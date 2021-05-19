const { salesService } = require('../services');
const { httpStatus, errorResponse } = require('../utils');
const rescue = require('express-rescue');

const getAll = rescue(async (_request, response) => {
  const sales = await salesService.getAll();
  response.status(httpStatus.SUCCESS).json(sales);
});

const getById = rescue(async (request, response) => {
  const { id } = request.params;
  const sales = await salesService.getById(id);
  response.status(httpStatus.SUCCESS).json(sales);
  
});

const create = rescue(async (request, response) => {
  const result = await salesService.create(request.body);
  response.status(httpStatus.SUCCESS).send(result);
});

const errorMiddleware = (err, _req, response, _next) => {
  if (err.toString().includes('not found')) {
    response.status(httpStatus.NOT_FOUND)
      .json(errorResponse.NOT_FOUND(err.message));
  } else {
    response.status(httpStatus.UNPROCESSABLE_ENTITY)
      .json(errorResponse.INVALID_DATA(err.message));
  }
};

module.exports = { getAll, getById, create, errorMiddleware };
