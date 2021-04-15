const salesService = require('../services/salesService');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_NOT_FOUND = 404;
const STATUS_UNPROCESSABLE_ENTITY = 422;

const createSale = async (req, res) => {
  const result = await salesService.createSale(req.body);
  if (typeof result === 'string') {
    res
      .status(STATUS_UNPROCESSABLE_ENTITY)
      .json({ err: { code: 'invalid_data', message: result } });
  } else {
    res.status(STATUS_OK).json(result);
  }
};

const getAllSales = async (_req, res) => {
  const result = await salesService.getAllSales();

  res.status(STATUS_OK).json({ sales: result });
};

const getSalesById = async (req, res) => {
  const { id } = req.params;

  const result = await salesService.getSalesById(id);

  if (typeof result === 'string' || null) {
    res
      .status(STATUS_NOT_FOUND)
      .json({ err: { code: 'not_found', message: result } });
  } else {
    res.status(STATUS_OK).json(result);
  }
};

module.exports = { createSale, getAllSales, getSalesById };
