const { StatusCodes } = require('http-status-codes');
const salesService = require('../service/salesService.js');

const insertNewSale = async (req, res) => {
  try {
    const result = await salesService.insertNewSale(req.body);
    res.status(StatusCodes.OK).send(result);
  } catch ({ message }) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(await JSON.parse(message));
  }
};

const findAll = async (_req, res) => {
  const result = await salesService.findAll();
  res.status(StatusCodes.OK).send(result);
};
const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await salesService.findById(id);
    res.status(StatusCodes.OK).send(result);
  } catch ({ message }) {
    res.status(StatusCodes.NOT_FOUND).send(message);
  }
};
module.exports = {
  insertNewSale,
  findAll,
  findById,
};