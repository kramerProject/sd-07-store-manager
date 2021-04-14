const rescue = require('express-rescue');
const services = require('../services/product');
const { throwError } = require('../configs/erro');
const { status, errors } = require('../configs/status');

const create = rescue(async (request, response) => {
  const { body } = request;

  const createdProduct = await services.createProduct(body);

  response.status(status.created).json(createdProduct);
});

const getAll = rescue(async (_request, response) => {
  const allProducts = await services.getAllProducts();

  response.status(status.ok).json(allProducts);
});

const getById = rescue(async (request, response) => {
  const { id } = request.params;

  const product = await services.getProductById(id);

  response.status(status.ok).json(product);
});

const update = rescue(async (request, response) => {
  const { id } = request.params;
  const { name, quantity } = request.body;

  const updatedProduct = await services.updateProduct(id, name, quantity);

  response.status(status.ok).json(updatedProduct);
});

const deleted = rescue(async (req, res) => {
  const { id } = req.params;

  const getProduct = await services.getProductById(id);

  if (!getProduct) throw new throwError(status.unprocessableEntity, errors.wrongId);

  await services.deleteProduct(id);

  const { name, quantity } = getProduct;

  const deletedProduct = {
    _id: id,
    name,
    quantity,
  };

  res.status(status.ok).json(deletedProduct);
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleted,
};