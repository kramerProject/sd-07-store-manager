const Sale = require('../models/saleModel');

const OK = 200;
const NOT_FOUND = 404;
const SERVERROR = 500;
const ERR_UNPR_ENTITY = 422;

const getAll = async (_req, res) => {
  try {
    const results = { sales: await Sale.getAll() };
    res.status(OK).json(results);
  } catch (err) {
    console.error(err);
    res.status(SERVERROR).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Sale.getById(id);

  if (!result) {
    return res.status(NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found'
      },
    });
  }

  res.status(OK).json(result);
};

const createSale = async (req, res) => {
  try {
    const salesArr = req.body;
    const result = await Sale.create(salesArr);

    res.status(OK).json(result);
  } catch (err) {
    console.error(err);
    res.status(SERVERROR).json({ message: err.message });
  }
};

const updateSale = async (req, res) => {
  try {
    const { id } = req.params;
    const itensSold = req.body;

    const result = await Sale.update(id, itensSold);

    if (!result) return res.status(SERVERROR).json({ message: 'Não encontrado' });

    return res.status(OK).json(result);
  } catch (err) {
    console.error(err);
    res.status(SERVERROR).json({ message: err.message });
  }
};

const deleteSale = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Sale.exclude(id);
    if (result) return res.status(OK).json(result);

    return res.status(ERR_UNPR_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  } catch (err) {
    console.error(err);
    res.status(SERVERROR).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  createSale,
  updateSale,
  deleteSale,
};
