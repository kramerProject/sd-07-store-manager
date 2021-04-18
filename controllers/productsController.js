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

const allProductsList = async (request, response) => {
  try {
    const result = await productsService.allProductsList();
    response.status(STATUS_CODE.SUCCESS).json({ products: result });
  } catch (error) {
    response.status(STATUS_CODE.BAD_REQUEST).json({  message: 'deu ruim' });
  }
};

const getProductByID = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await productsService.getProductByID(id);
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

const updateProduct = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, quantity } = request.body;
    const result = await productsService.updateProduct(id, name, quantity);
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
  productRegistration,
  allProductsList,
  getProductByID,
  updateProduct
};
