const productsModel = require('../models/productsModel');
const { CREATED, SUCCESS, UNPROCESSABLE_ENTITY } = require('../utils/statusCode.json');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsModel.create(name, quantity);
  res.status(CREATED).json(newProduct);
};

const update = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const updatedProduct = await productsModel.update(id, name, quantity);
  res.status(SUCCESS).json(updatedProduct);
};

const getAll = async (_req, res) => {
  const products = await productsModel.getAll();
  res.status(SUCCESS).json(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const err = new Error();
  err.code = 'invalid_data';
  err.statusCode = UNPROCESSABLE_ENTITY;
  err.message = 'Wrong id format';

  const product = await productsModel.getById(id);
  if (!product) throw err;
  res.status(SUCCESS).json(product);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
