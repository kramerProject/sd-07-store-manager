const { salesService } = require('../services');
const STATUS_CODE = require('../helper');
const { response } = require('express');

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

module.exports = {
  salesRegistration
};