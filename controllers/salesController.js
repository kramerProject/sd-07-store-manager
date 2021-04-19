const { salesService } = require('../services');
const STATUS_CODE = require('../helper');
const { response, request } = require('express');

const salesRegistration = async (request, response) => {
  try {
    const sale = request.body;
    const result = await salesService.salesRegistration(sale);
    response.status(STATUS_CODE.SUCCESS).json(result);
  } catch (error) {
    response.status(error.status).json({ 
      err: {
        code: error.code,
        message: error.message
      }
    });
  }
};

const getSales = async (request, response) => {
  try {
    const result = await salesService.getSales();
    response.status(STATUS_CODE.SUCCESS).json({ sales: result });
  } catch (error) {
    response.status(STATUS_CODE.BAD_REQUEST).json('deu ruim');
  }
};

const getSaleByID = async (request, response) => {
  try {
    const { id } = request.body;
    const result = await salesService.getSaleByID(id);
    response.status(STATUS_CODE.SUCCESS).json({ sales: result });
  } catch (error) {
    response.status(error.status).json({ 
      err: {
        code: error.code,
        message: error.message
      }
    });
  }
};

module.exports = {
  salesRegistration,
  getSales,
  getSaleByID
};