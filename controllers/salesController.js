const salesService = require('../services/salesService');

const OK = 200;
const NOT_FOUND = 404;
const UNPROCESSABLE = 422;

const createSales = async (req, res) => {
  const sales = req.body;

  try {
    const response = await salesService.createSales(sales);

    res.status(OK).json(response);
  } catch (err) {
    res.status(UNPROCESSABLE).json({
      err: {
        code: 'invalid_data',
        message: err.message,
      }
    });
  }
};

const findById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await salesService.findById(id);

    res.status(OK).json(response);
  } catch (err) {
    res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: err.message,
      }
    });
  }
};

const getAll = async (_req, res) => {
  try {
    const response = await salesService.getAll();

    res.status(OK).json(response);
  } catch (err) {
    res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: err.message,
      }
    });
  }
};

module.exports = {
  createSales,
  findById,
  getAll,
};
