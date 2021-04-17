const modelProducts = require('../models/products');

const productService = require('../services/productService');

const {status, errors} = require('../utils/status');

const { throwError } = require('../utils/errorHandler');

const OK = 200;
const CREATE = 201;
const UNPROCESS = 422;
const ERROR = 500;
const objError = {
  err: {
    code: 'invalid_data',
    message: ''
  }
};

const postProduct = async (request, response) => {
  try {
    const { name, quantity } = request.body;
    const results = await productService.createProduct(name, quantity);

    return response.status(CREATE).json(results);
  } catch (error) {
    console.error(error);

    const { message } = error;
    if (message.includes('quantity')
    || message.includes('name') || message.includes('Product')) {
      objError.err.message = error.message;
      return response.status(UNPROCESS).json({
        err: {
          code: 'invalid_data',
          message: error.message
        }
      });
    }
    response.status(ERROR).json({ message: error.message });
  }
};

const getProducts = async (request, response) => {
  try {
    const data = await productService.getAllProducts();
    return response.status(status.ok).json(data);
  } catch (error) {
    console.error(error);
    return res.status(ERROR).json({ message: error.message });
  }
};

const getProductsId = async (request, response) => {
  try {
    const { id } = request.params;
    const data = await productService.getProductsId(id);
    if (!data) {
      return response.status(UNPROCESS).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format'
        }
      });
    }
    return response.status(status.ok).json(data);
  } catch (error) {
    console.error(error);
    const { message } = error;
    if (message.includes('id')) {
      objError.err.message = error.message;
      return res.status(UNPROCESS).json(objError);
    }
    return response.status(ERROR).json({ message: error.message });
  }
};

const putProduct = async (request, response) => {
  const { id } = request.params;
  const { name, quantity } = request.body;
  const data = await productService.updateProduct(id, name, quantity);
  return response.status(status.ok).json(data);
};

const deleteProduct = async (request, response) => {
  const responseOK = 200;
  const responseError = 422;
  try {
    const { id } = request.params;
    const product = await modelProducts.getById(id);
    
    if (!product) throw { code: 'invalid_data', message: 'Wrong id format' };

    await productService.deleteProduct(product._id);

    return response.status(responseOK).json(product);
  } catch (error) {
    console.log(error);
    return response.status(responseError).json({ err: error});
  }
};

module.exports = {
  getProducts,
  getProductsId,
  postProduct,
  putProduct,
  deleteProduct,
};
