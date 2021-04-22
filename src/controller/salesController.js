const { StatusCodes } = require('http-status-codes');
const salesServices = require('../services/salesServices');

const postNewSale = async (req, res) => {
  try {
    const order = req.body;
    const responseOrder = await salesServices.postNewSale(order);
    return res.status(StatusCodes.OK).send(responseOrder);
  } catch ({ message }) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(JSON.parse(message));
  }
};

const getAll = async (_req, res) => {
  const search = await salesServices.getAll();
  return res.status(StatusCodes.OK).send(search);
};

const getSale = async (req, res) => {
  try {
    const { id } = req.params;
    const search = await salesServices.getById(id);
    return res.status(StatusCodes.OK).send(search);
  } catch ({ message }) {
    return res.status(StatusCodes.NOT_FOUND).send(message);
  }
};

const editSale = async (req, res) => {
  try {
    const { id } = req.params;
    const newSale = req.body;
    const editedSale = await salesServices.putSale(id, newSale);
    return res.status(StatusCodes.OK).send(editedSale);
  } catch ({ message }) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(JSON.parse(message));
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSale = await salesServices.deleteSale(id);
    return res.status(StatusCodes.OK).send(deletedSale);
  } catch ({ message }) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(JSON.parse(message));
  }
};

module.exports = {
  postNewSale,
  getAll,
  getSale,
  editSale,
  deleteSale
};
