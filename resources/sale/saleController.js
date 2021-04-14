const { StatusCodes } = require('http-status-codes');
const { ErrorHandler } = require('../../helpers/error');

const saleService = require('./saleService');

const addSale = async (req, res) => {
  const itensSold = req.body;
  // console.log('CONTROLLER itensSold: ', itensSold);
  const insertedSale = await saleService.add(itensSold);
  // console.log('CONTROLLER insertedSale: ', insertedSale);
  if (insertedSale) {
    res.status(StatusCodes.OK).json(insertedSale);
    return;
  }

  throw new ErrorHandler(
    StatusCodes.UNPROCESSABLE_ENTITY,
    'invalid_data', 
    'Houston we have a problem');
};

module.exports = {
  addSale,
};
