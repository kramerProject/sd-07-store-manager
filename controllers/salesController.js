const { salesService } = require('../services');
const { httpStatus, errorResponse } = require('../utils');
const rescue = require('express-rescue');

const getAll = rescue(async (_request, response) => {
  const sales = await salesService.getAll();
  response.status(httpStatus.SUCCESS).json(sales);
});

const create = rescue(async (request, response) => {
  const result = await salesService.create(request.body);
  console.log(result);
  response.status(httpStatus.SUCCESS).send(result);
});

const errorMiddleware = (err, _req, response, _next) => {
  response.status(httpStatus.UNPROCESSABLE_ENTITY)
    .json(errorResponse.INVALID_DATA(err.message));
  
};

module.exports = { getAll, create, errorMiddleware };
