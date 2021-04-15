const vendaModel = require('../models/vendaModel');
const validQuant = require('../sevices/vendaService');

const zero = 0;

const message = {
  ERROR_MESSAGE: 'Wrong product ID or invalid quantity',
  NOT_FOUND: 'Sale not found',
  ERROR_ID_SALE:'Wrong sale ID format',
};

const code = {
  invalid: 'invalid_data',
  notFound: 'not_found'
};
const status = {
  OK: 200,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  INTERNAL_SERVER_ERROR: 500,
};


const getAllSale = async (_request, response) => {
  try {
    const result = await vendaModel.getAllSale();
    response.status(status.OK).json({sales: result});
  } catch (error) {
    console.error(error);
    response.status(status.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getByIdSale = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await vendaModel.getByIdSale(id);

    if (!result) {
      return response.status(status.NOT_FOUND)
        .json({err:{code: code.notFound, message: message.NOT_FOUND }});
    }
    response.status(status.OK).json(result);
  } catch (error) {
    console.error(error);
    response.status(status.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const createSale = async (request, response) => {
  try {
    const newSales = [...request.body];
    const isTrue =  await vendaModel.validId(newSales);
    if(isTrue) {
      return response.status(status.UNPROCESSABLE)
        .json({err:{code: code.invalid, message: message.ERROR_MESSAGE}});
    }
    for(let i = zero; i < newSales.length; i = i + 1 ) {
      const {quantity} = newSales[i];
      if (!validQuant(quantity)) {
        return response.status(status.UNPROCESSABLE)
          .json({err:{code: code.invalid, message: message.ERROR_MESSAGE}});
      }
    }
    const result = await vendaModel.createSale(newSales);
    response.status(status.OK).json(result);
  } catch (error) {
    console.error(error);
    response.status(status.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const updateSale = async (request, response) => {
  try {
    const { id } = request.params;
    const newSales = [...request.body];
    const isTrue =  await vendaModel.validId(newSales);
    if(isTrue) {
      return response.status(status.UNPROCESSABLE)
        .json({err:{code: code.invalid, message: message.ERROR_MESSAGE}});
    }
    for(let i = zero; i < newSales.length; i = i + 1 ) {
      const {quantity} = newSales[i];
      if (!validQuant(quantity)) {
        return response.status(status.UNPROCESSABLE)
          .json({err:{code: code.invalid, message: message.ERROR_MESSAGE}});
      }
      const result = await vendaModel.updateSale(id, newSales);
      response.status(status.OK).json(result);
    }

  } catch (error) {
    console.error(error);
    response.status(status.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const deleteByIdSale = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await vendaModel.deleteByIdSale(id);
    if (!result) {
      response.status(status.UNPROCESSABLE)
        .json({err:{code: code.invalid, message: message.ERROR_ID_SALE}});
    }
    return response.status(status.OK).json(result);
  } catch (error) {
    console.error(error);
    response.status(status.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};


module.exports = {
  createSale,
  getAllSale,
  getByIdSale,
  updateSale,
  deleteByIdSale
};
