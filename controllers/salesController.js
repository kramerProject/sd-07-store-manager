const { createSalesService } = require('../services/salesService');

// const NEW_ITEM = 201;
const SUCCESS = 200;
// const INVALID_DATA = 422;
const INTERNAL_ERROR = 500;

const createSalesController = async(req, res) => {
  try {
    const salesArrayOfItens = req.body;
    const newSale = await createSalesService(salesArrayOfItens);
    res.status(SUCCESS).json(newSale);
  } catch (error) {
    res.status(INTERNAL_ERROR).json({
      message: error.message,
    });
  }
};

module.exports = { createSalesController };
