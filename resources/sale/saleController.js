const { StatusCodes } = require('http-status-codes');
const { ErrorHandler } = require('../../helpers/error');

const saleService = require('./saleService');

const addSale = async (req, res) => {
  const itensSold = req.body;
  const insertedSale = await saleService.add(itensSold);
  if (insertedSale) {
    res.status(StatusCodes.OK).json(insertedSale);
    return;
  }

  throw new ErrorHandler(
    StatusCodes.UNPROCESSABLE_ENTITY,
    'invalid_data', 
    'Houston we have a problem');
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const foundSale = await saleService.findById(id);
  if (foundSale) {
    res.status(StatusCodes.OK).json(foundSale);
    return;
  }
  throw new ErrorHandler(
    StatusCodes.NOT_FOUND,
    'not_found', 
    'Sale not found');
};

const getAllSales = async (_req, res) => {
  const allSales = await saleService.findAll();
  res.status(StatusCodes.OK).json(allSales);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const  [ itensSold ] = req.body;

  const updatedSale= await saleService.update(id, itensSold);
  if(updatedSale) {
    res.status(StatusCodes.OK).json(updatedSale);
    return;
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const deleteSale = await saleService.del(id);
  if (deleteSale) {
    res.status(StatusCodes.OK).json(deleteSale);
    return;
  }
  throw new ErrorHandler(
    StatusCodes.UNPROCESSABLE_ENTITY,
    'invalid_data', 
    'Wrong sale ID format');
};

module.exports = {
  addSale,
  getSaleById,
  getAllSales,
  updateSale,
  deleteSale,
};
