const { productsService } = require('../services');
const STATUS_CODE = require('../helper');

const productRegistration = async (request, response) => {
  try {
    const { name, quantity } = request.body;
    const result = await productsService.productRegistration(name, quantity);
    response.status(STATUS_CODE.CREATED).json(result);
  } catch (error) {
    response.status(error.status).json({ 
      err: {
        code: error.code,
        message: error.message
      }
    });
  }
};

module.exports = { productRegistration };
