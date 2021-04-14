const salesService = require('../services/salesService');

const OK = 200;
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

module.exports = {
  createSales,
};
