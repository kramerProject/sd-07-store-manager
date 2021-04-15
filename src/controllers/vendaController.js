const vendaModel = require('../models/vendaModel');
const validQuant = require('../sevices/vendaService');

const zero = 0;
const CODE = 'invalid_data';
const ERROR_MESSAGE = 'Wrong product ID or invalid quantity';
const status = {
  OK: 200,
  CREATE: 201,
  UNPROCESSABLE: 422,
  INTERNAL_SERVER_ERROR: 500
};

const createSale = async (request, response) => {
  try {
    const newSales = [...request.body];
    const isTrue =  await vendaModel.validId(newSales);
    if(isTrue) {
      return response.status(status.UNPROCESSABLE)
        .json({err:{code: CODE, message: ERROR_MESSAGE}});
    }
    for(let i = zero; i < newSales.length; i = i + 1 ) {
      const {quantity} = newSales[i];
      if (!validQuant(quantity)) {
        return response.status(status.UNPROCESSABLE)
          .json({err:{code: CODE, message: ERROR_MESSAGE}});
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

module.exports = {
  createSale,
};
