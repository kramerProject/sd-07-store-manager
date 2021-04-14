const modelProducts = require('../models/products');

const productService = require('../services/productService');

const {status, errors} = require('../utils/status');

const { throwError } = require('../utils/errorHandler');

const postProduct = async (request, response) => {
  const { body } = request;
  const data = await productService.createProduct(body);

  if (data.code) {
    return response.status(status.unprocessableEntity).json(
      { err: { code: 'invalid_data', message: 'Product already exists' }}
    );  
  }
  return response.status(status.created).json(data);
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
