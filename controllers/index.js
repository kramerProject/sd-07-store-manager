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
    // console.log(name, quantity);
    const results = await productService.createProduct(name, quantity);

    return response.status(CREATE).json(results);
  } catch (error) {
    console.error(error);

    const { message } = error;
    if (message.includes('quantity')
    || message.includes('name') || message.includes('Product')) {
      objError.err.message = error.message;
      return response.status(UNPROCESS).json(objError);
    }
    response.status(ERROR).json({ message: error.message });
  }
};

const getProducts = async (request, response) => {
  const data = await productService.getAllProducts();
  return response.status(status.ok).json(data);
};

const getProductsId = async (request, response) => {
  const { id } = request.params;
  const data = await productService.getProductsId(id);
  return response.status(status.ok).json(data);
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
