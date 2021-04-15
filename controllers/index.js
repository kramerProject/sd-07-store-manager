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

// luc.zago aluno turma 7
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
      return response.status(UNPROCESS).json({});
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
    // console.log(data);
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
    return res.status(ERROR).json({ message: error.message });
  }
};

const putProduct = async (request, response) => {
  const { id } = request.params;
  const { name, quantity } = request.body;
  const data = await productService.updateProduct(id, name, quantity);
  return response.status(status.ok).json(data);
};

const deleteProduct = async (request, response) => {
  const { id } = request.params;

  const getProduct = await productService.getProductsId(id);

  if (!getProduct) throw new throwError(status.unprocessableEntity, errors.wrongId);

  await productService.deleteProduct(id);

  const { name, quantity } = getProduct;

  const deleteProduct = {
    _id: id,
    name,
    quantity,
  };
  return response.status(status.ok).json(deleteProduct);
};

module.exports = {
  getProducts,
  getProductsId,
  postProduct,
  putProduct,
  deleteProduct,
};
