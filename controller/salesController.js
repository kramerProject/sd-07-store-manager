const Model = require('../model');
const rescue = require('express-rescue');
const Service = require('../service');

const OK = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE_ENTITY = 422;
const salesCollection = 'sales';
const productsCollection = 'products';

const insertSale = rescue(async (req, res) => {
  
  const itensSold = req.body;
  const data = { itensSold };

  const products = await Model.getAll(productsCollection);

  const response = Service.checkStockResponse(products, itensSold);

  if(response.code) return res.status(NOT_FOUND).json({ err: response});
  // await Service.updateQuantities(newSale.ops[0]);

  const newSale = await Model.insert(salesCollection, data);

  return res.status(OK).json(newSale.ops[0]);
});

const findAll = rescue(async (_req, res) => {
  const allSales = await Model.getAll(salesCollection);

  return res.status(OK).json({ sales: allSales});
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;

  const searchResult = await Model.findById(salesCollection, id);

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
  const itensSold = req.body;
  const { id } = req.params;
  const data = { itensSold };

  const updatedSale = await Model.update(salesCollection, id, data);

  res.status(OK).json(updatedSale);
});

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;

  const deletedSale = await Model.findById(salesCollection, id);

  if(!deletedSale) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        message: 'Wrong sale ID format',
        code: 'invalid_data',
      }
    });
  }

  await Model.deleteOne(salesCollection, id);
  return res.status(OK).json(deletedSale);
});

module.exports = {
  insertSale,
  findAll,
  findById,
  updateSale,
  deleteSale,
};
