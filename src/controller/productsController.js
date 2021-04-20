const { StatusCodes } = require('http-status-codes');
const productsServices = require('../services/productsServices');

const postNewProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productsServices.postNewProduct(name, quantity);
    return res.status(StatusCodes.CREATED).send(newProduct);
  } catch ({ message }) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(message);
  }
};

const getAll = async (_req, res) => {
  const search = await productsServices.getAll();
  res.status(StatusCodes.OK).send(search);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const search = await productsServices.getById(id);
    res.status(StatusCodes.OK).send(search);
  } catch ({ message }) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(JSON.parse(message));
  }
};

const putById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const patch = await productsServices.putById(id, name, quantity);
    res.status(StatusCodes.OK).send(patch);
  } catch ({ message }) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(JSON.parse(message));
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productsServices.deleteById(id);
    res.status(StatusCodes.OK).send(deletedProduct);
  } catch ({ message }) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(JSON.parse(message));
  }
};

module.exports = {
  postNewProduct,
  getAll,
  getById,
  putById,
  deleteById
};
