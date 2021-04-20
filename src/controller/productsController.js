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
    console.log(message);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(JSON.parse(message));
  }
};

module.exports = {
  postNewProduct,
  getAll,
  getById
};
