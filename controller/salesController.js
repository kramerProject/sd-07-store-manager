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

module.exports = {
  insertNewSale,
};