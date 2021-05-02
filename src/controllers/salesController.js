const { ObjectID } = require('bson');
const { salesService } = require('../service');
const { httpStatusCode } = require('./../../constants');

const creatSales = async (req, res, next) => {
  const saleInfo = req.body;
  try {
    const createdSale = await salesService.creatSales(saleInfo);
    return res.status(httpStatusCode.OK).json(createdSale);
  } catch (error) {
    console.log(error.message);
    return next({
      status: httpStatusCode.UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      message: error.message,
    });
  }
};

const getAllSales = async (req, res, next) => {
  try {
    const allSales = await salesService.getSales();
    return res.status(httpStatusCode.OK).json(allSales);
  } catch (error) {
    console.log(error.message);
    return next({
      status: httpStatusCode.NOT_FOUND,
      code: 'not_found',
      message: error.message,
    });
  }
};

const getSaleById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const saleById = await salesService.getSaleById(id);
    return res.status(httpStatusCode.OK).json(saleById);
  } catch (error) {
    console.log(error.message);
    return next({
      status: httpStatusCode.NOT_FOUND,
      code: 'not_found',
      message: error.message,
    });
  }
};

const updateSale = async (req, res, next) => {
  const salesInfo = req.body;
  const { id } = req.params;
  if(!ObjectID.isValid(id)) throw new Error('Sale not found');
  try {
    const updatedSale = await salesService.updateSale(id, salesInfo);
    return res.status(httpStatusCode.OK).json(updatedSale);
  } catch (error) {
    console.log(error.message);
    return next({
      status: httpStatusCode.UNPROCESSABLE_ENTITY,
      code: 'invalid_data',
      message: error.message,
    });
  }
};

module.exports = {
  creatSales,
  getAllSales,
  getSaleById,
  updateSale,
};
