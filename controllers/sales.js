const modelSales = require('../models/sales');

const serviceSales = require('../services/sales');

const {status, codeStatus, errors} = require('../utils/status');

const { throwError } = require('../utils/errorHandler');

const OK = 200;
const CREATE = 201;
const UNPROCESS = 422;
const ERROR = 500;
const NOMATCH = 404;
const objError = {
  err: {
    code: 'invalid_data',
    message: ''
  }
};

const postSale = async (request, response) => {
  try {
    const result =  await serviceSales.createSale(request.body);
    response.status(OK).json(result);
  } catch (error) {
    console.error(error);

    const { message } = error;
    if (message.includes('ID')) {
      objError.err.message = error.message;
      response.status(UNPROCESS).json(objError);
    }

    if (message.includes('amount')) {
      objError.err.code = 'stock_problem';
      objError.err.message = message;
      response.status(NOMATCH).json(objError);
    }

    response.status(ERROR).json({ message: error.message });
  }
};

const getAllSales = async (request, response) => {
  try {
    const data = await serviceSales.getAllSales();
    return response.status(status.ok).json({sales: data});
  } catch (error) {
    console.error(error);
    return response.status(ERROR).json({ message: error.message });
  }
};

const getSaleId = async (request, response) => {
  try {
    const { id } = request.params;
    const data = await serviceSales.getSaleId(id);
    // console.log(data);
    if (!data) {
      return response.status(UNPROCESS).json({
        err: {
          code: 'not_found',
          message: 'Sale not found'
        }
      });
    }
    return response.status(status.ok).json(data);
  } catch (error) {
    console.error(error);
    const { message } = error;
    if (message.includes('id')) {
      objError.err.message = error.message;
      return response.status(UNPROCESS).json(objError);
    }
    
    return response.status(NOMATCH).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      }
    });
  }
};

const putSale = async (request, response) => {
  try{
    const { id } = request.params;
    const sale = request.body;
    const data = await serviceSales.updateSale(id, sale);
    return response.status(status.ok).json(data);
  } catch (error) {
    console.error(error);
    return response.status(UNPROCESS).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    });
  }
  
};

const deleteSale = async (request, response) => {
  try {
    const { id } = request.params;
    const data = await serviceSales.getSaleId(id);

    if (!data) {
      return response.status(UNPROCESS).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }
    const result = await serviceSales.deleteSale(data._id);
    return response.status(OK).json(result);
  } catch (error) {
    console.error(error);
    return response.status(UNPROCESS).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format'
      }
    });
  }
};

module.exports = {
  getAllSales,
  getSaleId,
  postSale,
  putSale,
  deleteSale,
};
