const Sales = require('../service/sales');

const createSale = async (req, res) => {
  try {
    const { body } = req;
    const { code, message, result } = await Sales.createSale(body);

    if (!result) {
      return res.status(code).json({
        err: {
          code: 'invalid_data',
          message,
        },
      });
    }

    res.status(code).json(result);
  } catch (err) {
    console.error(err);
  }
};

const getAllSales = async (req, res) => {
  const { code, result } = await Sales.getAllSales();
  res.status(code).json({ sales: result });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const { code, message, result } = await Sales.getSaleById(id);

  if (!result) {
    return res.status(code).json({
      err: {
        code: 'not_found',
        message,
      },
    });
  }

  res.status(code).json(result[0]);
};

const updateSale = async (req, res) => {
  try {
    const itensSold = req.body;
    const { id } = req.params;
    const { code, message, result } = await Sales.updateSale(id, itensSold);

    if (!result) {
      return res.status(code).json({
        err: {
          code: 'invalid_data',
          message,
        },
      });
    }
    res.status(code).json(result[0]);
  } catch (err) {
    console.error(err);
  }
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { code, message, result } = await Sales.deleteSale(id);

  if (message) {
    return res.status(code).json({
      err: {
        code: 'invalid_data',
        message,
      },
    });
  }

  res.status(code).json(result[0]);
};

module.exports = { createSale, getAllSales, getSaleById, updateSale, deleteSale };
