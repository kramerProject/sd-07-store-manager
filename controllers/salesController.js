const salesModel = require('../models/salesModel');
const salesService = require('../services/salesService');
const productsModel = require('../models/productsModel');


const CREATE = 201;
const OK = 200;
const ERROR = 400;
const NOT_FOUND = 404;
const CONFLICT = 409;
const INVALID_DATA = 422;
const INTERNAL_SERVER_ERROR = 500;


const getAll = async (req, res) => {
  try {
    const results = await salesModel.getAll();

    return res.status(OK).json({sales: results});
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

const addSale = async (req, res) => {
  const sales = req.body;
  const resultQuantity = salesService.validateQuantity(sales);
  const resultUpdate = await salesService.updateAdd(sales);
  try {
    if (resultQuantity) throw Error(resultQuantity);
    if (resultUpdate) throw Error(resultUpdate);

    const sale = await salesModel.addSale(sales);

    return res.status(OK).json(sale);
  } catch (err) {
    if (err.message === 'Wrong product ID or invalid quantity') {
      return res.status(INVALID_DATA).json({
        err: {code: 'invalid_data', message: err.message }
      });
    }
    return res.status(NOT_FOUND).json({
      err: {code: 'stock_problem', message: err.message }
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await salesModel.getById(id);

    if (!result) throw Error('Sale not found');

    return res.status(OK).json(result);
  } catch (err) {
    return res.status(NOT_FOUND).json({
      err: {code: 'not_found', message: err.message }
    });
  }
};

const update = async (req, res) => {
  const sales = req.body;
  const {id} = req.params;
  const resultQuantity = salesService.validateQuantity(sales);
  const resultUpdate = await salesService.updateAdd(sales);
  try {
    if (resultQuantity) throw Error(resultQuantity);
    if (resultUpdate) throw Error(resultUpdate);
    const sale = await salesModel.update(sales, id);
    return res.status(OK).json(sale);
  } catch (err) {
    return res.status(INVALID_DATA).json({
      err: {code: 'invalid_data', message: err.message }
    });
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await salesModel.getById(id);
  try {
    if (!result) throw Error('Wrong sale ID format');
    await salesService.updateRemove(id);
    await salesModel.remove(id);

    return res.status(OK).json(result);
  } catch (err) {
    return res.status(INVALID_DATA).json({
      err: {code: 'invalid_data', message: err.message }
    });
  }
};


module.exports = {
  getAll,
  addSale,
  getById,
  update,
  remove,
};
