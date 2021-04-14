const SalesModel = require('../model/salesModel');
const rescue = require('express-rescue');

const OK = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;

const insertSale = rescue(async (req, res) => {
  
  const saleArray = req.body;
  const newSale = await SalesModel.insert(saleArray);

  return res.status(OK).json(newSale.ops[0]);
});

const findAll = rescue(async (_req, res) => {
  const allSales = await SalesModel.getAll();

  return res.status(OK).json({ sales: allSales});
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;

  const searchResult = await SalesModel.findById(id);

  if(!searchResult) {
    return res.status(NOT_FOUND).json({
      err: {
        message: 'Sale not found',
        code: 'not_found',
      }
    });
  }

  return res.status(OK).json(searchResult);
});

const updateSale = rescue(async (req, res) => {
  const saleArray = req.body;
  const { id } = req.params;

  const updatedSale = await SalesModel.update(id, saleArray);

  res.status(OK).json(updatedSale);
});

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;

  const deletedSale = await SalesModel.findById(id);

  if(!deletedSale) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        message: 'Wrong sale ID format',
        code: 'invalid_data',
      }
    });
  }

  await SalesModel.deleteSale(id);
  return res.status(OK).json(deletedSale);
});

module.exports = {
  insertSale,
  findAll,
  findById,
  updateSale,
  deleteSale,
};
